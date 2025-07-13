const mongoose = require("mongoose");

// Separate Media schema for better organization
const mediaSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
      trim: true,
    },
    originalName: {
      type: String,
      required: true,
      trim: true,
    },
    fileType: {
      type: String,
      required: true,
      enum: [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
        "video/mp4",
        "video/avi",
        "video/mov",
      ],
      lowercase: true,
    },
    mimeType: {
      type: String,
      required: true,
    },
    fileSize: {
      type: Number,
      required: true,
      min: 0,
      max: 50 * 1024 * 1024, // 50MB limit
    },
    filePath: {
      type: String,
      required: true,
    },
    // Store cloud URL if using cloud storage
    cloudUrl: String,
    // Thumbnail for images/videos
    thumbnailPath: String,
    thumbnailUrl: String,
    // Image/video dimensions
    dimensions: {
      width: Number,
      height: Number,
    },
    // Video duration in seconds
    duration: Number,
    // File hash for duplicate detection
    fileHash: String,
    // Upload status
    uploadStatus: {
      type: String,
      enum: ["uploading", "completed", "failed", "processing"],
      default: "completed",
    },
    // Metadata
    metadata: {
      exif: mongoose.Schema.Types.Mixed, // For images
      codec: String, // For videos
      bitrate: Number, // For videos
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
    // Soft delete
    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);

// Media indexes for better query performance
mediaSchema.index({ uploadedAt: -1 });
mediaSchema.index({ fileType: 1 });
mediaSchema.index({ uploadedBy: 1 });
mediaSchema.index({ fileHash: 1 });
mediaSchema.index({ isDeleted: 1, uploadedAt: -1 });

// Virtual for file URL
mediaSchema.virtual("fileUrl").get(function () {
  return this.cloudUrl || `/uploads/${this.filePath}`;
});

// Method to soft delete media
mediaSchema.methods.softDelete = function () {
  this.isDeleted = true;
  this.deletedAt = new Date();
  return this.save();
};

// Improved Group schema
const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 100,
      index: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    privacy: {
      type: String,
      enum: ["personal", "private", "public"],
      default: "personal",
      index: true,
    },
    // Reference to media instead of embedding
    media: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Media",
      },
    ],
    // Group owner
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    // Group members
    members: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        role: {
          type: String,
          enum: ["admin", "member"],
          default: "member",
        },
        joinedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    // Statistics
    stats: {
      mediaCount: {
        type: Number,
        default: 0,
      },
      memberCount: {
        type: Number,
        default: 1,
      },
      totalSize: {
        type: Number,
        default: 0,
      },
    },
    // Settings
    settings: {
      allowMemberUpload: {
        type: Boolean,
        default: true,
      },
      maxFileSize: {
        type: Number,
        default: 10 * 1024 * 1024, // 10MB
      },
      allowedFileTypes: [
        {
          type: String,
          enum: [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp",
            "video/mp4",
            "video/avi",
            "video/mov",
          ],
        },
      ],
    },
    // Soft delete
    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },
    deletedAt: Date,
    createdAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Group indexes
groupSchema.index({ owner: 1, createdAt: -1 });
groupSchema.index({ privacy: 1, createdAt: -1 });
groupSchema.index({ "members.user": 1 });
groupSchema.index({ isDeleted: 1, createdAt: -1 });

// Virtual for member count
groupSchema.virtual("memberCount").get(function () {
  return this.members.length;
});

// Method to add member
groupSchema.methods.addMember = function (userId, role = "member") {
  const existingMember = this.members.find(
    (m) => m.user.toString() === userId.toString()
  );
  if (!existingMember) {
    this.members.push({ user: userId, role });
    this.stats.memberCount = this.members.length;
  }
  return this.save();
};

// Method to remove member
groupSchema.methods.removeMember = function (userId) {
  this.members = this.members.filter(
    (m) => m.user.toString() !== userId.toString()
  );
  this.stats.memberCount = this.members.length;
  return this.save();
};

// Method to add media
groupSchema.methods.addMedia = function (mediaId, fileSize) {
  this.media.push(mediaId);
  this.stats.mediaCount = this.media.length;
  this.stats.totalSize += fileSize;
  return this.save();
};

// Method to remove media
groupSchema.methods.removeMedia = function (mediaId, fileSize) {
  this.media = this.media.filter((m) => m.toString() !== mediaId.toString());
  this.stats.mediaCount = this.media.length;
  this.stats.totalSize -= fileSize;
  return this.save();
};

// Method to soft delete group
groupSchema.methods.softDelete = function () {
  this.isDeleted = true;
  this.deletedAt = new Date();
  return this.save();
};

// Pre-save middleware to update stats
groupSchema.pre("save", function (next) {
  if (this.isModified("media")) {
    this.stats.mediaCount = this.media.length;
  }
  if (this.isModified("members")) {
    this.stats.memberCount = this.members.length;
  }
  next();
});

// Create separate models
const Media = mongoose.model("Media", mediaSchema);
const Group = mongoose.model("Group", groupSchema);

module.exports = { Group, Media };

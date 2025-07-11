const express = require("express");
const router = express.Router(); // ✅ You missed this
const Group = require("../models/Group");
const multer = require("multer");
const fs = require("fs");

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = "uploads";
    if (!fs.existsSync(folder)) fs.mkdirSync(folder);
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// CREATE group
router.post("/create", async (req, res) => {
  try {
    const { name, privacy } = req.body;
    const newGroup = new Group({
      name,
      privacy,
      media: [],
    });
    await newGroup.save();
    res.status(201).json(newGroup);
  } catch (err) {
    res.status(500).json({ error: "Could not create group" });
  }
});

// GET all groups
router.get("/all", async (req, res) => {
  try {
    const groups = await Group.find();
    res.json(groups);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch groups" });
  }
});

// GET group by ID
router.get("/:id", async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ error: "Group not found" });
    res.json(group);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// UPLOAD image to group
router.post("/:id/upload", upload.single("file"), async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ error: "Group not found" });

    const newMedia = {
      fileName: req.file.filename,
      fileType: req.file.mimetype,
      fileData: `/uploads/${req.file.filename}`,
    };

    group.media.push(newMedia);
    await group.save();

    res.status(200).json({ message: "Upload success", media: newMedia });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Upload failed" });
  }
});

module.exports = router;

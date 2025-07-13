import "./PhotoDisplay.css";
const PhotosDisplay = ({ photos, setCurrentTab }) => {
  const handleSeeAllPhotos = () => {
    setCurrentTab("all");
  };

  if (photos.length === 0) {
    return (
      <div className="empty-group">
        <div className="hanging-photos">
          <img src="/images/13.jpg" alt="Photo1" />
          <img src="/images/13.jpg" alt="Photo2" />
        </div>
        <p className="no-photo-text">No Photos to show yet</p>
        <button className="see-photos-btn" onClick={handleSeeAllPhotos}>
          See all photos
        </button>
      </div>
    );
  }

  return (
    <div className="uploaded-photos">
      {photos.map((mediaObj, i) => (
        <img
          key={i}
          src={`http://localhost:5000${mediaObj.fileData}`}
          alt={`uploaded-${i}`}
          className="uploaded-img"
        />
      ))}
    </div>
  );
};

export default PhotosDisplay;

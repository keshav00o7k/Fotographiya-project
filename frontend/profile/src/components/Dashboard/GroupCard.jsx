const GroupCard = ({ group, onClick }) => {
  return (
    <div className="group-card" onClick={onClick}>
      <div className="group-thumbnail">
        <img src="/images/group-icon.png" alt="group-icon" />
      </div>
      <div className="group-info">
        <span className="group-title">
          {group.name}
          {group.privacy === "personal" && (
            <span className="lock-icon">🔒</span>
          )}
        </span>
        <span className="group-photos-count">
          {group.media?.length || 0} Photos
        </span>
      </div>
    </div>
  );
};

export default GroupCard;

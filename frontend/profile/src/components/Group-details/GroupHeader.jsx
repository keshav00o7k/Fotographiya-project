import "./GroupHeader.css";

const GroupHeader = ({ groupData, mediaCount, onUpload }) => {
  return (
    <header className="group-header">
      <h1 className="group-name">
        {groupData?.name || "Group"} <span>{mediaCount} Photos</span>
      </h1>
      <div className="header-icons">
        <label className="icon-btn upload-btn">
          <input type="file" multiple hidden onChange={onUpload} />
          ⬆️
        </label>
        <button className="icon-btn">⚙️</button>
        <button className="icon-btn">🔗</button>
        <button className="icon-btn">⬇️</button>
      </div>
    </header>
  );
};

export default GroupHeader;

import "./GroupTabs.css";
const GroupTabs = ({ currentTab, setCurrentTab }) => {
  return (
    <nav className="group-tabs">
      <span
        className={currentTab === "my" ? "active-tab" : ""}
        onClick={() => setCurrentTab("my")}
      >
        My Photos
      </span>
      <span
        className={currentTab === "all" ? "active-tab" : ""}
        onClick={() => setCurrentTab("all")}
      >
        All Photos
      </span>
      <span
        className={currentTab === "Highlights" ? "active-tab" : ""}
        onClick={() => setCurrentTab("Highlights")}
      >
        Highlights
      </span>
    </nav>
  );
};

export default GroupTabs;

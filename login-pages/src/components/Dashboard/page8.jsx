import "./page8.css";

const Page8 = () => {
  const handleAppleClick = () => {
    window.open(
      "https://apps.apple.com/us/app/kwikpic-smart-photo-sharing/id1635944378",
      "_blank"
    );
  };

  const handlePlaystoreClick = () => {
    window.open(
      "https://play.google.com/store/apps/details?id=com.kwicpic&pli=1",
      "_blank"
    );
  };

  return (
    <>
      <div className="mainbox">
        <h1>Try the Fotographiya App for Free!</h1>
        <p>Download Now!</p>

        <div className="byy hy">
          <button onClick={handleAppleClick}>
            <img src="/image/apple button.png" alt="Apple" />
          </button>

          <button onClick={handlePlaystoreClick}>
            <img src="/image/playstore.png" alt="Playstore" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Page8;

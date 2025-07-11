import "./Hero.css";

const Hero = () => {
  // // Optional: log click or trigger some event before redirect
  // const handleAppleClick = () => {
  //   console.log("Apple button clicked");
  //   window.open(
  //     "https://apps.apple.com/us/app/kwikpic-smart-photo-sharing/id1635944378",
  //     "_blank"
  //   );
  // };

  // const handlePlaystoreClick = () => {
  //   console.log("Playstore button clicked");
  //   window.open(
  //     "https://play.google.com/store/apps/details?id=com.kwicpic&pli=1",
  //     "_blank"
  //   );
  // };

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1>
            Introducing the <br />
            All-New Fotographiya App
          </h1>
          <div className="highlight-line4"></div>
          <p>
            A photo sharing app powered by AI that helps you smartly share, find
            and interact with your photos.
          </p>

          {/* <div className="btton">
            <button className="store-button" onClick={handleAppleClick}>
              <img
                src="/image/apple button.png"
                alt="Download on Apple Store"
              />
            </button>

            <button className="store-button" onClick={handlePlaystoreClick}>
              <img src="/image/playstore.png" alt="Download on Play Store" />
            </button>
          </div> */}
        </div>

        <div className="hero-image">
          <img src="/image/13.jpg" alt="Kwikpic App Preview" />
        </div>
      </div>
    </section>
  );
};

export default Hero;

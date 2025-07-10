import './footer.css';

const Footer = () => {
  return (
    <>
      <div className="main4">
        <div>
               <div className="logo2">
            <img src="\image\logo.png" alt="Kwikpic Logo" />
          </div>
              <div className='ul-btn'>
            <div className="listfooter">
              <ul className="ull">
                <li>Home</li>
                <li>Photographer Benefits</li>
                <li>About Us</li>
                <li>Contact Us</li>
                <li>Pricing</li>
                <li>Blog</li>
                <li>FAQs</li>
              </ul>
            </div>

             <div className="bttn">
              
                <img
                  src="https://img.icons8.com/ios-filled/24/1da1f2/instagram-new.png"
                  alt="Instagram"
                />
              
             
                <img
                  src="https://img.icons8.com/ios-filled/24/0a66c2/linkedin.png"
                  alt="LinkedIn"
                />
             
                <img
                  src="https://img.icons8.com/ios-filled/24/1877f2/facebook-new.png"
                  alt="Facebook"
                />
              
                <img
                  src="https://img.icons8.com/ios-filled/24/ff0000/youtube-play.png"
                  alt="YouTube"
                />
              
            </div>
          </div>
        </div>

        {/* Footer Bottom Text */}
        <div className="footerbottom">
          <p className="leftside">© 2024 Kwikpic. All rights reserved.</p>
          <p className="rightside">
            <a href="#">Privacy policy</a> | 
            <a href="#">Terms & conditions</a> | 
            <a href="#">Refunds</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;

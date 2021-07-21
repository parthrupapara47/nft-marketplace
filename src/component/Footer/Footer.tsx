import React from "react";
import { Footer as BaseFooter, LanguageDropdown } from "decentraland-ui";

const Footer: React.FC = () => {
  return (
    <div className="ui container dcl footer">
      <div className="main-footer">
        <LanguageDropdown
          locale="en"
          direction="right"
          upward
          locales={["en", "es", "fr"]}
        />
        <div className="links">
          <a>Home</a>
          <a>Privacy Policy</a>
          <a>Terms of Use</a>
          <a>Content Policy</a>
          <a>Code of Ethics</a>
        </div>
      </div>
      <div className="secondary-footer">
        <div className="social-links">
          <a>
            <i className="social-icon discord"></i>
          </a>
          <a>
            <i className="social-icon reddit"></i>
          </a>
          <a>
            <i className="social-icon github"></i>
          </a>
          <a>
            <i className="social-icon twitter"></i>
          </a>
        </div>
        <div className="copyright">© 2021 XinFin</div>
      </div>
    </div>
  );
};

export default Footer;

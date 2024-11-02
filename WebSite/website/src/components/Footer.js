import React from "react";

import "./Footer.css";

function Footer()
{
  return(
    <footer className="siteFooter">
      <hr></hr>
      <section className="footerInformations">
        <div className="footerSocialMedia">
          <div className="footerSocialMediaLogo"><button><img src="" alt="" /></button></div>
          <div className="footerSocialMediaButtons">
            <button><img src="" alt="" /></button>
            <button><img src="" alt="" /></button>
            <button><img src="" alt="" /></button>
            <button><img src="" alt="" /></button>
          </div>
        </div>
        <div className="footerContact">
          <h4><b>Contact</b></h4>
          <p>+000 000 000</p>
          <p><a href="">email@email.com</a></p>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
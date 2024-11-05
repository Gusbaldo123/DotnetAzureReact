import React from "react";
import { Link } from "react-router-dom";

import "./Footer.css";

function Footer()
{
  const iconWebsite = require("../../assets/IconSH.png");
  return(
    <footer className="siteFooter">
      <hr></hr>
      <section className="footerInformations">
        <div className="footerSocialMedia">
          <div className="footerSocialMediaLogo"><Link className="iconHeader" to={{pathname: '/home'}}><img src={iconWebsite} alt="socialMediaLogo" /></Link></div>
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
          <p><a href="mailto:email@email.com?subject=Placeholder Subject&cc=emailCc@email.com&bcc=emailCco@email.com&body=Placeholder Body">email@email.com</a></p>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
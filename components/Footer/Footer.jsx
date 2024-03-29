import React from "react";
import Image from "next/image";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
  TiArrowSortedDown,
  TiArrowSortedUp,
} from "react-icons/ti";
import { RiSendPlaneFill } from "react-icons/ri";

//INTERNAL IMPORT
import Style from "./Footer.module.css";
import images from "../../img";
import { Discover, HelpCenter } from "../NavBar/index";

const Footer = () => {
  return (
    <div className={Style.footer}>
      <div className={Style.footer_box}>
        <div className={Style.footer_box_social}>
          <Image className={Style.logo} src={images.logo} alt="footer logo" height={50} width={50} />
          <p>
            Content creators on KIMOCHI have endless possibilities with their AI characters. They can bring their creations to life, infusing them with unique personalities, traits, and appearances.
          </p>

          <div className={Style.footer_social}>
            <a href="#">
              <TiSocialFacebook />
            </a>
            <a href="#">
              <TiSocialLinkedin />
            </a>
            <a href="#">
              <TiSocialTwitter />
            </a>
            <a href="#">
              <TiSocialYoutube />
            </a>
            <a href="#">
              <TiSocialInstagram />
            </a>
          </div>
        </div>

        <div className={Style.footer_box_discover}>
          {/* <h3>Discover</h3>
          <Discover /> */}
        </div>

        <div className={Style.footer_box_help}>
          {/* <h3>Help Center</h3>
          <HelpCenter /> */}
        </div>

        <div className={Style.subscribe}>
          {/* <h3>Subscribe</h3> */}

          <div className={Style.subscribe_box}>
            <input type="email" placeholder="Enter your email *" />
            <RiSendPlaneFill className={Style.subscribe_box_send} />
          </div>
          <div className={Style.subscribe_box_info}>
            <p>
              Immerse yourself in a world of endless possibilities with KIMOCHI. Users embark on an extraordinary journey of entertainment and emotional connections.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

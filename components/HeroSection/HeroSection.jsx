import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./HeroSection.module.css";
import { Button } from "../componentsindex";
import images from "../../img";
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";
import TokenComponent from "./Token/Token";
import DiamondComponent from "./Diamond/Diamond";
import Goldmponent from "./Gold/Gold";
import WithdrawStakeAmount from './Withdraw/Withdraw';
import StakeAmount from './Swap/StakeAmount'
import { useSession, signIn, signOut } from "next-auth/react"
import axios from "axios";
const HeroSection = () => {
  const { titleData, isReload, setIsReload } = useContext(NFTMarketplaceContext)
  const { data: session } = useSession()
  const [displaySection, setDisplaySection] = useState("stake");
  const handleButtonClick = (section) => {
    setDisplaySection(section);
  };



  return (
    <div className={Style.heroSection}>
      <div className={Style.heroSection_box}>
        <div className={Style.heroSection_box_left}>
          <div className={Style.main_content}>
            <div className={Style.button_section}>
              <button
                onClick={() => handleButtonClick("stake")}
                className={`${Style.button} ${displaySection === "stake" ? Style.active : ""}`}
              >
                Swap
              </button>
              <button
                onClick={() => handleButtonClick("withdraw")}
                className={`${Style.button} ${displaySection === "withdraw" ? Style.active : ""}`}
              >
                Withdraw
              </button>
            </div>
            {displaySection === "stake" && (
              <div className={Style.stake_wrapper}>

                <StakeAmount />
              </div>
            )}
            {displaySection === "withdraw" && (
              <div className={Style.stake_wrapper}>
                <WithdrawStakeAmount />
              </div>
            )}
          </div>
        </div>
        <div className={Style.heroSection_box_right}>
          <Goldmponent session={session} />
          <DiamondComponent session={session} />
          <TokenComponent session={session} />
        </div>
      </div>
    </div >
  );
};

export default HeroSection;

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GrClose } from "react-icons/gr";
import { useRouter } from "next/router";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
  TiArrowSortedDown,
  TiArrowSortedUp,
} from "react-icons/ti";

//INTERNAL IMPORT
import Style from "./SideBar.module.css";
import images from "../../../img";
import Button from "../../Button/Button";
import ModalLogin from "../Modal/Modal";
import { useSession, signIn, signOut } from "next-auth/react"
const SideBar = ({ setOpenSideMenu, currentAccount, connectWallet, ethBalance, session }) => {
  //------USESTATE
  const [openDiscover, setOpenDiscover] = useState(false);
  const [openHelp, setOpenHelp] = useState(false);
  const router = useRouter()
  //--------DISCOVER NAVIGATION MENU
  // const discover = [
  //   {
  //     name: "Collection",
  //     link: "collection",
  //   },
  //   {
  //     name: "Search",
  //     link: "searchPage",
  //   },
  //   {
  //     name: "Author Profile",
  //     link: "author",
  //   },
  //   {
  //     name: "Account Setting",
  //     link: "account",
  //   },
  //   {
  //     name: "Connect Wallet",
  //     link: "connectWallet",
  //   },
  //   // {
  //   //   name: "Blog",
  //   //   link: "blog",
  //   // },
  // ];
  //------HELP CNTEER
  const helpCenter = [
    {
      name: "Login with Google",
      link: "google",
    },
    {
      name: "Login with Apple",
      link: "apple",
    }
  ];

  // ----------Login-------------------------------------------

  const handleLogin = (e, el) => {
    if (el.link === "google") {
      signIn('google');
    }
    // console.log(e, el)
    // 
  }



  const openHelpMenu = () => {
    if (!openHelp) {
      setOpenHelp(true);
    } else {
      setOpenHelp(false);
    }
  };

  const closeSideBar = () => {
    setOpenSideMenu(false);
  };

  return (
    <div className={Style.sideBar}>
      <GrClose
        className={Style.sideBar_closeBtn}
        onClick={() => closeSideBar()}
      />

      <div className={Style.sideBar_box}>
        <Image src={images.logo} alt="logo" width={150} height={150} />
        <p>
          Discover the most outstanding articles on all topices of NFT & write
          your own stories and share them
        </p>
        <div className={Style.sideBar_social}>
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


      <div className={Style.sideBar_button}>
        {
          currentAccount == "" ? (
            < Button btnName="Connect" handleClick={() => connectWallet()} />
          ) : (
            <div className={Style.navbar_container_box_profile}>
              <div>
                <Image
                  src={images.user1}
                  alt="Profile"
                  width={40}
                  height={40}
                  // onClick={() => openProfile()}
                  className={Style.navbar_container_right_profile}
                />
              </div>
              <div className={Style.navbar_container_box_profile_info}>
                <small>{currentAccount.slice(0, 10)}...{currentAccount.slice(35, 42)}</small>
                <small>{ethBalance} ETH</small>
              </div>
              {/* {profile && <Profile currentAccount={currentAccount} />} */}
            </div>
            // <Button btnName="Create" handleClick={() => router.push('/uploadNFT')} />

          )
        }
        {
          session == null ? (
            <div>
              <div
                className={Style.sideBar_menu_box}
                onClick={() => openHelpMenu()}
              >
                <p>LOGIN</p>
                <TiArrowSortedDown />
              </div>

              {openHelp && (
                <div className={Style.sideBar_discover}>
                  {helpCenter.map((el, i) => (
                    <p key={i + 1}>
                      <a onClick={(e) => handleLogin(e, el)}>{el.name}</a>
                      {/* <Link href={{ pathname: `${el.link}` }}>{el.name}</Link> */}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ) : (

            <div>
              {/* <ModalLogin
                className={Style.modal_box}
                isOpen={isOpen}
                closeModal={closeModal}
              />
              <Button className={Style.button_login} btnName="Login" handleClick={() => { }} /> */}
            </div>


          )
        }

      </div>
    </div>
  );
};

export default SideBar;

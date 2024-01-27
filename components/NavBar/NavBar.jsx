import React, { useEffect, useState, useContext, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
//----IMPORT ICON
import { MdNotifications } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { CgMenuLeft, CgMenuRight } from "react-icons/cg";
import { useRouter } from "next/router";
import { useSession, signIn, signOut, removeAuthToken } from "next-auth/react"
//----IMPORT SMART CONTRACT
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";

//INTERNAL IMPORT
import Style from "./NavBar.module.css";
import { Discover, HelpCenter, Notification, Profile, SideBar } from "./index";
import ModalLogin from "./Modal/Modal";
import { Button } from "../componentsindex";
import images from "../../img";
import ModalWallet from "./ModalWallet/ModalWallet";



const NavBar = () => {
  //----USESTATE COMPONNTS
  const [discover, setDiscover] = useState(false);
  const [help, setHelp] = useState(false);
  const [notification, setNotification] = useState(false);
  const [profile, setProfile] = useState(false);
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [ethBalance, setEthBalance] = useState(null);
  const discoverMenuRef = useRef(null);
  const helpMenuRef = useRef(null);
  const navbarRef = useRef(null);
  const [signOutG, setSignOutG] = useState(false);
  const router = useRouter()
  const { data: session } = useSession();
  const [sessionData, setSessionData] = useState(null);
  useEffect(() => {
    if (session) {
      setSessionData(session);
      // console.log(sessionData)
    }
  }, [session]);
  // console.log(session)
  const openMenu = (e) => {
    const btnText = e.target.innerText;
    if (btnText == "Discover") {
      setDiscover(true);
      setHelp(false);
      setNotification(false);
      setProfile(false);
    } else if (btnText == "Help Center") {
      setDiscover(false);
      setHelp(true);
      setNotification(false);
      setProfile(false);
    } else {
      setDiscover(false);
      setHelp(false);
      setNotification(false);
      setProfile(false);
    }
  };

  // close menu
  const openDiscoverMenu = () => {
    setDiscover(!discover);
    setHelp(false);
  };

  const closeAccount = () => {
    setSignOutG(!signOutG);
    // setHelp(false);
  };

  const handleProfileMouseEnter = () => {
    setSignOutG(true);
  };

  const handleProfileMouseLeave = () => {
    setSignOutG(false);
  };

  const signOutGg = async () => {
    await signOut({
      redirect: false,
      callbackUrl: '/',
      state: JSON.stringify({ returnTo: '/' }), // Thêm returnTo vào state
    });
    // removeAuthToken();
    setSessionData(null);

  }

  const openHelpMenu = () => {
    setDiscover(false);
    setHelp(!help);
  };



  // ------------------------------------
  // const openNotification = () => {
  //   if (!notification) {
  //     setNotification(true);
  //     setDiscover(false);
  //     setHelp(false);
  //     setProfile(false);
  //   } else {
  //     setNotification(false);
  //   }
  // };

  // const openProfile = () => {
  //   if (!profile) {
  //     setProfile(true);
  //     setHelp(false);
  //     setDiscover(false);
  //     setNotification(false);
  //   } else {
  //     setProfile(false);
  //   }
  // };

  const openSideBar = () => {
    if (!openSideMenu) {
      setOpenSideMenu(true);
    } else {
      setOpenSideMenu(false);
    }
  };


  const closeMenus = (e) => {
    if (discoverMenuRef.current && !discoverMenuRef.current.contains(e.target)) {
      setDiscover(false);
    }

    if (helpMenuRef.current && !helpMenuRef.current.contains(e.target)) {
      setHelp(false);
    }

    if (navbarRef.current && !navbarRef.current.contains(e.target)) {
      setDiscover(false);
      setHelp(false);
      setNotification(false);
      setProfile(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', closeMenus);

    return () => {
      document.removeEventListener('mousedown', closeMenus);
    };
  }, []);

  //SMART CONTRACT
  const { currentAccount, connectWallet, checkEthBalance } = useContext(NFTMarketplaceContext)
  const handleClickLogo = () => {
    router.push('/');
  };


  const fetchData = async () => {
    try {
      const eth = await checkEthBalance();
      // console.log(123, eth);
      setEthBalance(eth);
    } catch (error) {
      console.error('Lỗi khi lấy số dư ETH:', error);
    }
  };

  useEffect(() => {
    if (currentAccount) {
      fetchData();
    }
  }, [currentAccount]);


  // ----------Login-------------------------------------------

  const [isOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    if (!isOpen) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
    // setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };



  const [isOpen1, setIsModalOpen1] = useState(false);
  const openModal1 = () => {
    if (!isOpen1) {
      setIsModalOpen1(true);
    } else {
      setIsModalOpen1(false);
    }
    // setIsModalOpen(true);
  };

  const closeModal1 = () => {
    setIsModalOpen1(false);
  };
  return (
    <div className={Style.navbar} ref={navbarRef}>
      <div className={Style.navbar_container}>
        <div className={Style.navbar_container_left}>
          <div className={Style.logo}>
            <Image
              src={images.logo}
              alt="NFT MARKET PLACE"
              width={50}
              height={50}
              onClick={handleClickLogo}
            />
          </div>
          <div className={Style.navbar_container_left_box_input}>
            {/* <div className={Style.navbar_container_left_box_input_box}>
              <input type="text" placeholder="Search NFT" />
              <BsSearch onClick={() => { }} className={Style.search_icon} />
            </div> */}
          </div>
        </div>


        {/* //END OF LEFT SECTION */}
        <div className={Style.navbar_container_right}>
          {/* NOTIFICATION */}
          <div className={Style.navbar_container_right_notify}>
            {/* <MdNotifications
              className={Style.notify}
              onClick={() => openNotification()}
            />
            {notification && <Notification />} */}
          </div>

          <div className={Style.navbar_container_right_discover}>
            {/* DISCOVER MENU */}
            <p onClick={(e) => openDiscoverMenu(e)}>Swap</p>

          </div>

          {/* HELP CENTER MENU */}
          {
            sessionData == null ? (
              <div className={Style.navbar_container_right_help}>
                <p onClick={(e) => openModal()}>Login</p>
                {isOpen && (
                  // className={Style.navbar_container_right_help_box}
                  <div onClick={closeModal}>
                    <ModalLogin
                      className={Style.modal_box}
                      isOpen={isOpen}
                      closeModal={closeModal}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div
                className={Style.navbar_container_box_profile}
                // onClick={(e) => closeAccount(e)}
                onMouseEnter={handleProfileMouseEnter}
                onMouseLeave={handleProfileMouseLeave}
              >
                <div>
                  <img
                    src={sessionData.user.image}
                    alt="Profile"
                    width={40}
                    height={40}
                    // onClick={() => openProfile()}
                    className={Style.navbar_container_right_profile}
                  />
                </div>
                <div className={Style.navbar_container_box_profile_info}>
                  <small>{sessionData.user.name}</small>
                  <small>{sessionData.user.email}</small>
                </div>
                {signOutG && (
                  <div className={Style.navbar_container_right_discover_box}>
                    <a onClick={() => signOutGg()}>Sign out</a>
                  </div>
                )}
              </div>
            )
          }




          {/* CREATE BUTTON SECTION */}
          <div className={Style.navbar_container_right_button}>
            {
              currentAccount == "" ? (
                <div className={Style.navbar_container_right_help}>
                  <p onClick={(e) => openModal1()}>Select Wallet</p>
                  {isOpen1 && (
                    // className={Style.navbar_container_right_help_box}
                    <div onClick={closeModal1}>
                      <ModalWallet
                        className={Style.modal_box}
                        isOpen={isOpen1}
                        closeModal={closeModal1}
                      />
                    </div>
                  )}
                </div>
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
              )
            }

          </div>

          {/* USER PROFILE */}

          {/* <div className={Style.navbar_container_right_profile_box}>
            {
              currentAccount == "" ? (
                <div className={Style.navbar_container_right_profile}>
                </div>
              ) : (
                <div className={Style.navbar_container_right_profile}>
                  <Image
                    src={images.user1}
                    alt="Profile"
                    width={40}
                    height={40}
                    onClick={() => openProfile()}
                    className={Style.navbar_container_right_profile}
                  />

                  {profile && <Profile currentAccount={currentAccount} />}
                </div>
              )
            }

          </div> */}

          {/* MENU BUTTON */}

          <div className={Style.navbar_container_right_menuBtn}>
            <CgMenuRight
              className={Style.menuIcon}
              onClick={() => openSideBar()}
            />
          </div>
        </div>
      </div>

      {/* SIDBAR CPMPONE/NT */}
      {openSideMenu && (
        <div className={Style.sideBar}>
          <SideBar
            ethBalance={ethBalance}
            setOpenSideMenu={setOpenSideMenu}
            currentAccount={currentAccount}
            connectWallet={connectWallet}
            session={session} />
        </div>
      )}
    </div>
  );
};

export default NavBar;

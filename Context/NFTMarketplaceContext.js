import React, { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import Router, { useRouter } from "next/router";
import axios from 'axios';
import web3modal from 'web3modal';
import { create as ipfsHttpClient } from "ipfs-http-client";
import FormData from "form-data";
//INTERNAL
import { WithdrawAddress, WITHDRAWABI, ERC20Address, ERC20ABI, SwapAddress, SWAPABI } from "./constants";
import { toast } from "react-hot-toast";

//FETCHING SMART CONTRACT

export const fetchContract = (address, abi, signerOrProvider) => new ethers.Contract(address, abi, signerOrProvider);
// console.log(NFTMarketplaceABI)

//---CONNECTING WITH SMART CONTRACT
const connectingWithSmartContract = async () => {
  try {
    const web3Modal = new web3modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner()
    const contract = fetchContract(ERC20Address, ERC20ABI, signer)
    return { contract, signer, provider };
  } catch (error) {
    console.log('Something error', error.message)
  }
}

export const connectingWithSmartContractSwap = async () => {
  try {
    const web3Modal = new web3modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(SwapAddress, SWAPABI, signer)
    return { contract, signer, provider };
  } catch (error) {
    console.log('Something error', error.message)
  }
}

export const connectingWithSmartContractWithdraw = async () => {
  try {
    const web3Modal = new web3modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner()
    const contract = fetchContract(WithdrawAddress, WITHDRAWABI, signer)
    return { contract, signer, provider };
  } catch (error) {
    console.log('Something error', error.message)
  }
}

// connectingWithSmartContract()
export const NFTMarketplaceContext = React.createContext();


export const NFTMarketplaceProvider = ({ children }) => {
  const [isReload, setIsReload] = useState(false);
  const titleData = "Discover, collect, and sell NFTs"; //titleData
  // const { toast, promise } = useToaster();
  //====USESTATE
  const [currentAccount, setCurrentAccount] = useState("");
  const router = useRouter()

  const supportedWallets = [
    { type: "metamask", name: "MetaMask" },
    { type: "phantom", name: "Phantom" },
    { type: "rabby", name: "Rabby" },
    // Thêm các loại ví khác nếu cần
  ];
  const [selectedWalletType, setSelectedWalletType] = useState("");
  ////====CHECK IF WALLET IS CONNECTD 
  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum) {
        toast.error("Install Metamask");
        console.log("Install Metamask");
        // Reload trang khi không có Metamask
        location.reload();
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_accounts"
      });

      if (accounts.length) {
        setCurrentAccount(accounts[0])
        // console.log(currentAccount)
      } else {
        console.log("No Account ");
        // Reload trang khi không có tài khoản

      }

    } catch (error) {
      console.log("Something wrong while connecting to wallet");
      // Reload trang khi có lỗi

    }
  };

  const handleAccountsChanged = (accounts) => {
    if (accounts.length == 0) {
      setCurrentAccount('')
    } else {
      setCurrentAccount(accounts[0]);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }
    checkIfWalletConnected();
  }, [handleAccountsChanged, checkIfWalletConnected])
  // -------connect wallet

  const connectWallet = async (walletType) => {
    try {
      if (!window.ethereum) {
        toast.error("Install Metamask");
        return console.log("Install Metamask");
      }

      let method;
      switch (walletType) {
        case "metamask":
          method = "eth_requestAccounts";
          break;
        case "phantom":
          // Cài đặt phương thức kết nối cho Phantom
          method = "phantom_specific_method";
          break;
        case "rabby":
          // Cài đặt phương thức kết nối cho Rabby
          method = "rabby_specific_method";
          break;
        // Thêm các case cho các loại ví khác
        default:
          setError("Unsupported wallet type");
          setOpenError(true);
          return;
      }

      const accounts = await window.ethereum.request({
        method: method
      });

      setCurrentAccount(accounts[0]);
      setSelectedWalletType(walletType); // Lưu loại ví được chọn
      //   window.location.reload();

    } catch (error) {
      alert(error.message)
    }
  };


  const checkEthBalance = async () => {
    try {

      // const price = ethers.utils.parseUnits(formInputPrice.toString(), 9);

      const { contract, signer, provider } = await connectingWithSmartContract();
      // console.log('contract', contract)
      const balanceWei = await provider.getBalance(currentAccount);

      const balanceEth = ethers.utils.formatEther(balanceWei);
      const roundedBalanceEth = parseFloat(balanceEth).toFixed(4);

      return roundedBalanceEth;

    } catch (error) {
      console.log("error delete", error.message);
    }
  }

  const checkTokenBalance = async () => {
    try {
      const { contract, signer, provider } = await connectingWithSmartContract();
      const contractERC20 = fetchContract(ERC20Address, ERC20ABI, signer);
      const balanceWei = await contractERC20.balanceOf(currentAccount);
      const balanceToken = ethers.utils.formatUnits(balanceWei.toString(), 18);
      const roundedBalanceToken = parseFloat(balanceToken).toFixed(4);
      return roundedBalanceToken;

    } catch (error) {
      console.log("error delete", error.message);
    }
  }

  // const SwapByToken = async (formInputAmount) => {
  //     try {

  //         const amount = ethers.utils.parseUnits(formInputAmount.toString(), 9);

  //         const { contract, signer, provider } = await connectingWithSmartContract();

  //         const contractERC20 = fetchERC20Contract(signer);
  //         const balanceWei = await contractERC20.balanceOf(currentAccount);

  //         const balanceToken = ethers.utils.formatUnits(balanceWei.toString(), 9);

  //         const roundedBalanceToken = parseFloat(balanceToken).toFixed(4);
  //         // console.log('contract', balanceEth)
  //         return roundedBalanceToken;

  //     } catch (error) {
  //         console.log("error delete", error.message);
  //     }
  // }

  return (
    <NFTMarketplaceContext.Provider value={{
      checkIfWalletConnected,
      connectWallet,
      currentAccount,
      titleData,
      checkEthBalance,
      checkTokenBalance,
      connectingWithSmartContractSwap,
      fetchContract,
      SwapAddress,
      isReload,
      setIsReload,
      supportedWallets,
      setSelectedWalletType,
      selectedWalletType,
      connectingWithSmartContractWithdraw
    }}>
      {children}
    </NFTMarketplaceContext.Provider>
  );
};
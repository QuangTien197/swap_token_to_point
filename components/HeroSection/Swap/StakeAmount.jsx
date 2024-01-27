import { useContext, useRef, useEffect, useState } from "react";
import { ethers } from "ethers"
// import Web3Context from "../../context/Web3Context";
import Button from "../../Button/Button";
// import StakingContext from "../../context/StakingContext";
import { toast } from "react-hot-toast";
import Style from "./Swap.module.css";
import { NFTMarketplaceContext } from "../../../Context/NFTMarketplaceContext";
import axios from "axios";
import { getSession, useSession } from 'next-auth/react';
import { WithdrawAddress, WITHDRAWABI, ERC20Address, ERC20ABI, SwapAddress, SWAPABI } from "../../../Context/constants";
const StakeAmount = () => {
    const { connectingWithSmartContractSwap, fetchContract, SwapAddress, isReload, setIsReload, currentAccount } = useContext(NFTMarketplaceContext)
    const stakeAmountRef = useRef();
    const { data: session, status, update } = useSession();
    const [approve, setApprove] = useState(false);

    const stakeToken = async (e) => {
        e.preventDefault();
        const amount = stakeAmountRef.current.value.trim();

        if (isNaN(amount) || amount <= 0) {
            toast.error("Please enter a valid positive number.");
            return;
        }
        const amountToSwap = ethers.utils.parseUnits(amount, 18).toString();
        try {
            if (session) {
                const { contract, signer, provider } = await connectingWithSmartContractSwap();
                const contractERC20 = fetchContract(ERC20Address, ERC20ABI, signer);
                const allowance = await contractERC20.allowance(currentAccount, SwapAddress);
                const allowanceToken = ethers.utils.formatUnits(allowance.toString(), 18);

                if (parseInt(amount) > parseInt(allowanceToken)) {
                    // console.log(12312)
                    const approve = await contractERC20.approve(SwapAddress, amountToSwap);

                    // await approve.wait();
                    await toast.promise(approve.wait(),
                        {
                            loading: "Approve is pending...",
                            success: 'Approve successful 👌',
                            error: 'Approve failed 🤯'
                        });
                }
                else {
                    // console.log(session)

                    // console.log('data', data);
                    const transaction = await contract.swap(amountToSwap);
                    await toast.promise(
                        transaction.wait(),
                        {
                            loading: "Transaction is pending...",
                            success: 'Transaction successful 👌',
                            error: 'Transaction failed 🤯'
                        }
                    ).then(async () => {
                        const data = {
                            sub: session.googleId,
                            points: amount / 100

                        }
                        const responseData = await axios.post('https://api.kimochi.fun/api/v1/users/swapToken', data);
                        stakeAmountRef.current.value = "";
                        setIsReload(!isReload);
                    }).catch((error) => {
                        console.error('Error during transaction:', error);
                    });
                }
            } else {
                toast.error("Not Sign In");
            }


        } catch (error) {
            toast.error("Swap Failed");
            console.error(error.message)
        }
    };

    const approveToken = async (e) => {

        e.preventDefault();
        const amount = stakeAmountRef.current.value.trim();

        if (isNaN(amount) || amount <= 0) {
            toast.error("Please enter a valid positive number.");
            return;
        }

        const amountToSwap = ethers.utils.parseUnits(amount, 18).toString();

        try {
            if (session) {
                const { contract, signer, provider } = await connectingWithSmartContractSwap();
                const contractERC20 = fetchContract(ERC20Address, ERC20ABI, signer);

                const allowance = await contractERC20.allowance(currentAccount, SwapAddress);

                const allowanceToken = ethers.utils.formatUnits(allowance.toString(), 18);
                // console.log(allowanceToken)
                // console.log(amount)
                if (parseInt(amount) > parseInt(allowanceToken)) {
                    // console.log(12312)
                    const approve = await contractERC20.approve(SwapAddress, amountToSwap);

                    // await approve.wait();
                    await toast.promise(approve.wait(),
                        {
                            loading: "Approve is pending...",
                            success: 'Approve successful 👌',
                            error: 'Approve failed 🤯'
                        });
                } else {
                    setApprove(true);
                }
            } else {
                toast.error("Not Sign In");
            }


        } catch (error) {
            toast.error("Swap Failed");
            console.error(error.message)
        }
    }
    const fetchData = async () => {
        try {
            update();
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    };

    useEffect(() => {
        if (session) {
            fetchData();
        }
    }, [isReload])
    return (
        <form onSubmit={stakeToken} className={Style.stake_amount_form}>
            <label className={Style.stake_input_label}>Token Amount:</label>
            <input type="text" ref={stakeAmountRef} />
            <div className={Style.stake_amount_form_button}>
                {approve === false ? (
                    <button className={Style.button} onClick={approveToken} type="submit">
                        Approve
                    </button>
                ) : (
                    <div></div>
                )}

                {approve === false ? (
                    <button className={Style.button1} onClick={stakeToken} type="submit">
                        Swap Token
                    </button>
                ) : (
                    <button className={Style.button2} onClick={stakeToken} type="submit">
                        Swap Token
                    </button>
                )}

            </div>
        </form>
    )
}
export default StakeAmount;
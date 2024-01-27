import { useContext, useRef, useEffect } from "react";
import { ethers } from "ethers"
import { NFTMarketplaceContext } from "../../../Context/NFTMarketplaceContext";
import axios from "axios";
import Button from "../../Button/Button";
import { toast } from "react-hot-toast";
import Style from "./Withdraw.module.css";
import { getSession, useSession } from 'next-auth/react';
import { WithdrawAddress, WITHDRAWABI, ERC20Address, ERC20ABI, SwapAddress, SWAPABI } from "../../../Context/constants";
const WithdrawStakeAmount = () => {

    const { connectingWithSmartContractWithdraw, fetchContract, SwapAddress, isReload, setIsReload } = useContext(NFTMarketplaceContext)
    const withdrawAmountRef = useRef();
    const { data: session, status, update } = useSession();

    const withdrawToken = async (e) => {
        e.preventDefault();
        const amount = withdrawAmountRef.current.value.trim();
        // console.log(amount)
        if (isNaN(amount) || amount <= 0) {
            console.error("Please enter a valid positive number");
            return;
        }
        try {

            const responseData = await axios.get(`https://api.kimochi.fun/api/v1/users/${session.googleId}`);
            // console.log(responseData.data.diamond)
            if (amount > responseData.data.diamond) {
                return toast.error("Not enough diamond");
            }
            const amountToWithdraw = ethers.utils.parseUnits(amount, 18).toString();
            // console.log(amountToWithdraw)

            const { contract, signer, provider } = await connectingWithSmartContractWithdraw();


            const transaction = await contract.withdraw(amountToWithdraw);
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
                    diamond: amount

                }
                const responseData = await axios.post('https://api.kimochi.fun/api/v1/users/withdraw', data);
                withdrawAmountRef.current.value = "";
                setIsReload(!isReload);
            }).catch((error) => {
                console.error('Error during transaction:', error);
            });



        } catch (error) {
            toast.error("Staking Failed");
            console.error(error.message)
        }
    };

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
        <form className={Style.withdraw_form} onSubmit={withdrawToken}>
            <label>Withdraw Diamond:</label>
            <input type="text" ref={withdrawAmountRef} />
            <button className={Style.button} onClick={withdrawToken} type="submit">
                Withdraw
            </button>
        </form>
    )
}
export default WithdrawStakeAmount;
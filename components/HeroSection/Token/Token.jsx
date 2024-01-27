import { useState, useContext, useEffect } from "react";
import Style from "./Token.module.css";
import { NFTMarketplaceContext } from "../../../Context/NFTMarketplaceContext";

const TokenComponent = () => {
    const { currentAccount, checkTokenBalance, isReload } = useContext(NFTMarketplaceContext)

    const [tokenVal, setTokenVal] = useState("0");

    const fetchData = async () => {
        try {
            const token = await checkTokenBalance();
            // console.log(123, token);
            setTokenVal(token);
        } catch (error) {
            // toast.error("token Failed");
            console.error('Lỗi khi lấy số dư ETH:', error);
        }
    };

    useEffect(() => {
        if (currentAccount) {
            fetchData();
        }
    }, [currentAccount, isReload])

    return (
        <div className={Style.token_box}>
            <p>Token Balance:</p>
            <span>{tokenVal} OTONA</span>
        </div>
    )
}
export default TokenComponent;
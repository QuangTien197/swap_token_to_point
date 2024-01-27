import { useState, useContext, useEffect } from "react";
import Style from "./Gold.module.css";
// import { NFTMarketplaceContext } from "../../../Context/NFTMarketplaceContext";


const Gold = ({ session }) => {
    // const { checkTokenBalance, isReload, currentAccount } = useContext(NFTMarketplaceContext)
    const [isGold, setisGold] = useState("0");
    const fetchData = async () => {
        try {
            setisGold(session.point)
        } catch (error) {
            console.error(error.message)
        }
    };
    useEffect(() => {
        if (session) {
            fetchData(session);
        } else {
            setisGold('0')
        }
    }, [session])

    return (
        <div className={Style.gold_box}>
            <p>Gold Balance: </p>
            <span>{isGold} GOLD</span>
        </div>
    )
}
export default Gold;
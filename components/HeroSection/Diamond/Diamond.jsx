import { useState, useContext, useEffect } from "react";
import Style from "./Diamond.module.css";
// import { NFTMarketplaceContext } from "../../../Context/NFTMarketplaceContext";

const Diamond = ({ session }) => {
    // const { currentAccount, checkTokenBalance, isReload } = useContext(NFTMarketplaceContext)
    const [diamond, setDiamond] = useState("0");


    const fetchData = async (session) => {
        try {
            // console.log(session);
            setDiamond(session.diamond)
        } catch (error) {
            console.error(error.message)
        }
    };


    useEffect(() => {
        if (session) {
            fetchData(session);
        } else {
            setDiamond('0')
        }
    }, [session])


    return (
        <div className={Style.diamond_box}>
            <p>Diamond Balance:</p>
            <span>{diamond} DIAMOND </span>
        </div>
    )
}
export default Diamond;
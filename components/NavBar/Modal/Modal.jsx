//IMPORT MODAL
import { Modal } from 'react-bootstrap';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import React from "react";
import Link from "next/link";
// import StyleButton from "../../../NFTDetailsPage/NFTDescription/NFTDescription";

//INTERNAL IMPORT
import Style from "./Modal.module.css";

import { useSession, signIn, signOut } from "next-auth/react"
const ModalLogin = ({ isOpen, closeModal }) => {

    const handleLoginGg = async () => {
        // Sử dụng prompt: 'select_account' để buộc người dùng chọn tài khoản khác
        await signIn('google', { prompt: 'select_account' });
    };
    const handleLoginAp = () => {
        console.log('handleLoginAp')
    }

    const { data: session } = useSession()

    //--------DISCOVER NAVIGATION MENU
    return (
        <Modal show={isOpen} onHide={closeModal} centered className={Style.modal}>
            <div className={Style.modal_box}>
                <Modal.Header>
                    <Modal.Title><h1>Login</h1></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={Style.socialLogin}>
                        <button onClick={() => handleLoginGg()} className={Style.button_modal}>
                            <GoogleIcon sx={{ fontSize: '25px', paddingRight: '5px' }} /> Login with Google
                        </button>
                        <button onClick={handleLoginAp} className={Style.button_modal1}>
                            <AppleIcon sx={{ fontSize: '25px', paddingRight: '5px' }} />  Login with Apple
                        </button>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </div>
        </Modal>
    );
};

export default ModalLogin;

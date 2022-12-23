import React, { useContext, useState, useEffect } from 'react'
import './Register.scss';
import { Link } from "react-router-dom";
import figiLogo from '../../data/figiman.png';
import ggIcon from '../../data/LoginBackgroundImgs/googleIcon.png';
import fbIcon from '../../data/LoginBackgroundImgs/fbIcon.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import RegisterForm from './RegisterForm';

function Register({ title }) {

    useEffect(() => {
        document.title = title;
    }, [title])

    const [isClick, setIsClick] = useState(false)

    const handleGoBack = () => {
        setIsClick(false);
    }

    const handleRegisterWithEmail = () => {
        setIsClick(true);
    }

    return (
        <div className="register">
            <div className="register-form">
                <div className="register-form-container">
                    {isClick &&
                        (
                            <ChevronLeftIcon className="goBack" onClick={handleGoBack} />
                        )
                    }
                    <Link to="/"><img src={figiLogo} alt="Trang Chủ" className="logo" /></Link>
                    <p className="register-welcome">
                        Đăng ký tài khoản Figiman
                    </p>
                    {!isClick && (
                        <>
                            <div
                                className="register-with"
                                onClick={handleRegisterWithEmail}
                            >
                                <AccountCircleIcon />
                                Sử dụng email / số điện thoại
                            </div>
                            <div className="register-with">
                                <img src={ggIcon} alt=""></img>
                                Tiếp tục với Google
                            </div>
                            <div className="register-with">
                                <img src={fbIcon} alt=""></img>
                                Tiếp tục với Facebook
                            </div>
                        </>
                    )}

                    {isClick && (
                        <RegisterForm />
                    )}

                    <p className="no-account">
                        Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register;

import React, { useContext, useState, useEffect } from 'react';
import './Login.scss';
import { Link } from "react-router-dom";
import figiLogo from '../../data/figiman.png';
import ggIcon from '../../data/LoginBackgroundImgs/googleIcon.png';
import fbIcon from '../../data/LoginBackgroundImgs/fbIcon.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import PhoneForm from './PhoneForm';
import { useDispatch, useSelector } from 'react-redux';
import { setForgetPassClick } from '../../redux/userSlice';



function Login({ title }) {

  useEffect(() => {
    document.title = title;
  }, [title])

  //use redux,
  const userStore = useSelector((state) => state.user)
  const dispatch = useDispatch();

  const [isClick, setIsClick] = useState(false)

  const handleLoginWithEmail = () => {
    setIsClick(true);
  }

  const handleGoBack = () => {
    setIsClick(false);
  }

  const handleGoBackEmailForm = () => {
    dispatch(setForgetPassClick(false))
  }

  return (
    <div className="login">
      <div className="login-form">
        <div className="login-form-container">
          {isClick && (
            !userStore.forgetPassClick
              ? <ChevronLeftIcon className="goBack" onClick={handleGoBack} />
              : <ChevronLeftIcon className="goBack" onClick={handleGoBackEmailForm} />
          )
          }
          <Link to="/"><img src={figiLogo} alt="Trang Chủ" className="logo" onClick={handleGoBackEmailForm} /></Link>
          <p className="login-welcome">{!userStore.forgetPassClick
            ? "Đăng nhập vào Figiman"
            : "Lấy lại mật khẩu"}</p>
          {!isClick && (
            <>
              <div className="login-with" onClick={handleLoginWithEmail}>
                <AccountCircleIcon />
                Sử dụng email / số điện thoại
              </div>
              <div className="login-with">
                <img src={ggIcon} alt=""></img>
                Tiếp tục với Google
              </div>
              <div className="login-with">
                <img src={fbIcon} alt=""></img>
                Tiếp tục với Facebook
              </div>
            </>
          )}
          {isClick && (
            <PhoneForm />
          )}
          {!userStore.forgetPassClick && (
            <p className="no-account">
              Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;

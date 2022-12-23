import React, { useContext, useState } from 'react';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { setForgetPassClick } from '../../redux/userSlice';


function PhoneForm() {

  //use redux,
  const userStore = useSelector((state) => state.user)
  const dispatch = useDispatch();

  const [phoneValid, setPhoneValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [confirmValid, setConfirmValid] = useState(false);
  const [loginToggle, setLoginToggle] = useState(false);

  const handleEnterPhoneNumber = (e) => {
    var phoneLength = e.target.value.length;
    if (phoneLength === 10 || phoneLength === 11) {
      setPhoneValid(true);
    } else {
      setPhoneValid(false);
    }
  }

  const handleConfirmInput = (e) => {
    var inputLength = e.target.value.length;
    if (inputLength === 4) {
      console.log("okkkk");
      setConfirmValid(true)
    } else {
      setConfirmValid(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 69 || e.keyCode === 190 || e.keyCode === 110) {
      e.preventDefault();
    }
    if (phoneValid) {
      if ((e.keyCode !== 8 && e.keyCode !== 46)) {
        e.preventDefault();
      }
    }
  }

  const handleKeyDownConfirm = (e) => {
    if (e.keyCode === 69 || e.keyCode === 190 || e.keyCode === 110) {
      e.preventDefault();
    }
    if (confirmValid) {
      if ((e.keyCode !== 8 && e.keyCode !== 46)) {
        e.preventDefault();
      }
    }
  }

  const handleLoginToggle = () => {
    setLoginToggle(prev => !prev)
  }

  const handleEnterEmail = (e) => {
    let email = e.target.value;
    if (validator.isEmail(email)) {
      setEmailValid(true)
    } else {
      setEmailValid(false)
    }
  }

  const handleForgotPass = () => {
    dispatch(setForgetPassClick(true))
  }

  return (
    <div className="phone-form">
      <div className="label-group">
        <p>{!loginToggle ? "Số điện thoại" : "Email"}</p>
        {!userStore.forgetPassClick && (
          <p className="log-with-toggle" onClick={handleLoginToggle}>
            {!loginToggle ? "Đăng nhập với email" : "Đăng nhập với SĐT"}
          </p>
        )}
      </div>

      {!loginToggle && (
        <>
          <input
            className="phone-input"
            type="number"
            autoFocus
            placeholder="Số điện thoại"
            onChange={handleEnterPhoneNumber}
            onKeyDown={handleKeyDown} />
          <div className="confirm-input-group">
            <input
              className="confirm-code-input"
              type="number"
              disabled={!phoneValid}
              placeholder="Nhập mã xác nhận"
              onChange={handleConfirmInput}
              onKeyDown={handleKeyDownConfirm} />
            <button
              style={phoneValid
                ? { cursor: "pointer", backgroundColor: "var(--color-blue)", color: "var(--text-color)" }
                : {}}
              className="send-code-btn"
              disabled={!phoneValid}>Gửi mã</button>
          </div>
          <button
            style={phoneValid
              ? { cursor: "pointer" }
              : {}}
            className="login-btn"
            disabled={!phoneValid}>Đăng nhập</button>
        </>
      )}

      {loginToggle && (
        <>
          <input
            className="email-input"
            type="email"
            autoFocus
            placeholder="Địa chỉ email"
            onChange={handleEnterEmail} />
          {!userStore.forgetPassClick && (
            <>

              <input
                className="password-input"
                type="password"
                placeholder="Mật khẩu" />
            </>
          )}
          {userStore.forgetPassClick && (
            <>
              <div className="confirm-input-group">
                <input
                  className="confirm-code-input"
                  type="number"
                  disabled={!emailValid}
                  placeholder="Nhập mã xác nhận"
                  onChange={handleConfirmInput}
                  onKeyDown={handleKeyDownConfirm} />
                <button
                  style={emailValid
                    ? { cursor: "pointer", backgroundColor: "var(--color-blue)", color: "var(--text-color)" }
                    : {}}
                  className="send-code-btn"
                  disabled={!emailValid}>Gửi mã</button>
              </div>
            </>
          )}
          <button
            style={emailValid
              ? { cursor: "pointer" }
              : {}}
            className="login-btn"
            disabled={!emailValid}>{!userStore.forgetPassClick ? "Đăng nhập" : "Xác nhận"}</button>
          {!userStore.forgetPassClick && (
            <p className="forgot-pass" onClick={handleForgotPass}>Quên mật khẩu?</p>
          )}
        </>
      )}

    </div>
  )
}

export default PhoneForm

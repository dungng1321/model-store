import React, { useState } from 'react';
import validator from 'validator';

function RegisterForm() {
    const [registerToggle, setRegisterToggle] = useState(false);
    const [phoneValid, setPhoneValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const [confirmValid, setConfirmValid] = useState(false);


    const handleRegisterToggle = () => {
        setRegisterToggle(prev => !prev)
    }

    const handleEnterPhoneNumber = (e) => {
        var phoneLength = e.target.value.length;
        if (phoneLength === 10 || phoneLength === 11) {
            setPhoneValid(true);
        } else {
            setPhoneValid(false);
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

    const handleConfirmInput = (e) => {
        var inputLength = e.target.value.length;
        if (inputLength === 4) {
            console.log("okkkk");
            setConfirmValid(true)
        } else {
            setConfirmValid(false)
        }
    }

    const handleEnterEmail = (e) => {
        let email = e.target.value;
        if (validator.isEmail(email)) {
            setEmailValid(true)
        } else {
            setEmailValid(false)
        }
    }

    return (
        <div className="register-forms">
            <div className="label">Tên của bạn?</div>
            <input
                type="text"
                className="name-input"
                autoFocus
                placeholder="Họ và tên" />
            <div className="label-group">
                <p>{!registerToggle ? "Số điện thoại" : "Email"}</p>
                <p className="register-with-toggle" onClick={handleRegisterToggle}>
                    {!registerToggle ? "Đăng ký với email" : "Đăng ký với SĐT"}
                </p>
            </div>

            {!registerToggle && (
                <>
                    <input
                        className="phone-input"
                        type="number"
                        placeholder="Số điện thoại"
                        onChange={handleEnterPhoneNumber}
                        onKeyDown={handleKeyDown}
                    />
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
                        disabled={!phoneValid}>Đăng ký</button>
                </>
            )}

            {registerToggle && (
                <>
                    <input
                        className="email-input"
                        type="email"
                        autoFocus
                        placeholder="Địa chỉ email"
                        onChange={handleEnterEmail} />
                    <input
                        className="password-input"
                        type="password"
                        placeholder="Mật khẩu" />
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
                    <button
                        style={emailValid
                            ? { cursor: "pointer" }
                            : {}}
                        className="login-btn"
                        disabled={!emailValid}>Đăng ký</button>
                </>
            )}

        </div>
    )
}

export default RegisterForm;

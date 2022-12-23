import React from 'react'
import { Link } from "react-router-dom";
import './Footer.css'
import figiLogo from '../../data/figiman.png';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PinterestIcon from '@mui/icons-material/Pinterest';
import SendIcon from '@mui/icons-material/Send';

function Footer() {
  return (
    <footer className="footer">

      <div className="content">
        <div className="logo">
          <div style={{ width: '100%' }}>
            <Link to="/"><img src={figiLogo} alt="Trang Chủ" /></Link>
          </div>

          <div className="about">
            <div className="about-content">
              <h3>Về FIGIMAN</h3>
              <p>Chúng tôi chuyên cung cấp những mô hình chính hãng, chất lượng cao
                 với giá thành cực kì ổn áp để cho tất cả mọi người đều có thể thỏa mãn với
                  niềm đam mê sưu tập mô hình mà không phải sợ rằng cuối tháng sẽ ăn mì gói hay nhịn đói.
              </p>
            </div>
          </div>
        </div>

        <div className="contact">
          <div className="contact-info">
            <h3>Thông Tin Liên Lạc</h3>

            <h4>Địa Chỉ</h4>
            <p>163 Nguyễn Văn A, TP.HCM</p>

            <h4>Điện Thoại</h4>
            <p>0968 123 456</p>

            <div className="social-icons">
              <FacebookRoundedIcon className="icon" />
              <InstagramIcon className="icon" />
              <TwitterIcon className="icon" />
              <YouTubeIcon className="icon" />
              <PinterestIcon className="icon" />
            </div>

          </div>
        </div>

        <div className="customer-sp">
          <h3>Đăng kí để luôn cập nhật thông tin mới nhất</h3>

          <div style={{display: 'flex'}}>
            <input type="text" placeholder="Nhập email..." />
            <SendIcon className="subcribe-icon" />
          </div>

        </div>

      </div>

      <div className="copy-right">
        Copyright © 2022 FIGIMAN | Built with React by NGDUNG1321.
      </div>
    </footer>
  )
}

export default Footer
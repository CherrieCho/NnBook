import React from "react";
import "./styles/Footer.style.css";
import footerLogoImg from "../assets/NnBook-footer-Logo.png";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top-area">
        <p>회사소개</p>
        <p>이용약관</p>
        <p>개인정보처리방침</p>
        <p>청소년보호정책</p>
        <div className="footer-top-area-hidden">
          <p>채용정보</p>
          <p>도서홍보안내</p>
        </div>
      </div>
      <div className="footer-bottom-area">
        <div className="footer-logo-area">
          <img
            src={footerLogoImg}
            alt="NnBook Logo"
            className="footer-logo-img"
          />
        </div>
        <div className="footer-customer-area">
          <p className="footer-customer">고객문의</p>
          <button className="footer-button">
            1:1 문의<span>›</span>
          </button>
          <button className="footer-button">
            자주 묻는 질문<span>›</span>
          </button>
        </div>
      </div>
      <div className="footer-copyright-area">
        <p className="footer-copyright">
          Copyright &copy; {new Date().getFullYear()} NnBook Corp. All Rights
          Reserved.
        </p>
      </div>
      {/* <div className="footer-inner">
        <div className="footer-column footer-branding">
          <h2 className="footer-logo">NnBook</h2>
          <p className="footer-tagline">당신의 독서를 더 가치 있게</p>
          <div className="footer-social">
            <span className="social-icon">📘</span>
            <span className="social-icon">🐦</span>
            <span className="social-icon">📸</span>
          </div>
        </div>

        <div className="footer-column footer-links">
          <p>소개</p>
          <p>이용약관</p>
          <p>개인정보처리방침</p>
        </div>

        <div className="footer-column footer-info">
          <p className="footer-contact">이메일 | contact@nnbook.com</p>
          <p className="footer-contact">전화 | 02-1234-5678</p>
          <p className="footer-contact">서울특별시 마포구 서교동 123-45</p>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} NnBook. 모든 권리 보유.
      </div> */}
    </footer>
  );
}

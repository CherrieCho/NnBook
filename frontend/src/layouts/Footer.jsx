import React from "react";
import "./styles/Footer.style.css";
import footerLogoImg from "../assets/NnBook-footer-Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  const goToDev1Github = () => {
    window.open(
      "https://github.com/JiHy0ung",
      "_blank",
      "noopener, noreferrer"
    );
  };
  const goToDev2Github = () => {
    window.open(
      "https://github.com/CherrieCho",
      "_blank",
      "noopener, noreferrer"
    );
  };

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
        <div className="footer-dev-info">
          <button onClick={goToDev1Github} className="footer-dev-btn">
            <FontAwesomeIcon icon={faGithub} className="footer-github-icon" />{" "}
            지형 <span>›</span>
          </button>
          <button onClick={goToDev2Github} className="footer-dev-btn">
            <FontAwesomeIcon icon={faGithub} className="footer-github-icon" />{" "}
            채은 <span>›</span>
          </button>
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
    </footer>
  );
}

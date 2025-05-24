import React from "react";
import "./styles/NotFound.style.css";

const NotFound = () => {

  const handleHomeButtonClick = () => {
    window.location.href = "/";
  };
  return (
    <div className="not-found-container">
      <p className="not-found-text-title">404</p>
      <p className="not-found-text-sub">찾을 수 없는 페이지입니다.</p>
      <button onClick={handleHomeButtonClick} className="not-found-btn">홈 페이지로 이동</button>
    </div>
  );
};

export default NotFound;

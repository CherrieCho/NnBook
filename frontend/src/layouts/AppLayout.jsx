import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Outlet, useNavigate } from "react-router-dom";
import LogoImg from "../assets/NnBook-Logo.png";
import Footer from "./Footer";
import "./styles/AppLayout.style.css";

const AppLayout = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("로그아웃 되었습니다.");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <div className="app-container">
      <Navbar
        expand="lg"
        className="custom-navbar"
        sticky="top"
      >
        <Container className="nav-custom-container">
          <Navbar.Brand as={Link} to="/">
            <img src={LogoImg} alt="NnBook Logo" className="navbar-logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {isLoggedIn && (
                <>
                  <Nav.Link className="nav-menu" as={Link} to="/meeting">
                    모임
                  </Nav.Link>
                  <Nav.Link className="nav-menu" as={Link} to="/rental">
                    대여
                  </Nav.Link>
                  <Nav.Link className="nav-menu" as={Link} to="/library">
                    내 서재
                  </Nav.Link>
                  <Nav.Link className="nav-menu" as={Link} to="/mypage">
                    마이페이지
                  </Nav.Link>
                </>
              )}

              {isLoggedIn ? (
                <Nav.Link
                  className="nav-menu"
                  as="button"
                  onClick={handleLogout}
                >
                  로그아웃
                </Nav.Link>
              ) : (
                <>
                  <Nav.Link className="nav-menu" as={Link} to="/login">
                    로그인
                  </Nav.Link>
                  <Nav.Link className="nav-menu" as={Link} to="/login/signup">
                    회원가입
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
      <Footer />
    </div>
  );
};

export default AppLayout;

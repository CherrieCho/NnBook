import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoImg from "../../assets/NnBook-Logo.png";
import "./styles/SignIn.style.css";
import authApi from "../../utils/authApi";
import { Container } from "react-bootstrap";

function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await authApi.post("/auth/login", formData);
      localStorage.setItem("token", res.data.token);

      const decoded = jwtDecode(res.data.token);
      localStorage.setItem("user", JSON.stringify(decoded));
      navigate("/");
    } catch (err) {
      alert("로그인 실패: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="signin-container">
      <div className="sign-in-logo-wrapper" onClick={() => navigate("/")}>
        <img
          src={LogoImg}
          alt="NnBook 로고"
          className="sign-in-logo-img"
          onClick={() => navigate("/")}
        />
      </div>
      <form onSubmit={handleSubmit} className="signin-form">
        <input
          placeholder="이메일"
          type="email"
          name="email"
          className="sign-in-input-box"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          placeholder="비밀번호"
          type="password"
          name="password"
          className="sign-in-input-box"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="sign-in-log-in-btn">
          로그인
        </button>
        <button
          type="button"
          className="sign-in-sign-up-btn"
          onClick={() => navigate("/login/signup")}
        >
          회원가입
        </button>
      </form>
    </div>
  );
}

export default SignIn;

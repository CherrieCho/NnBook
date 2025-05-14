import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoImg from "../../assets/NnBook-Logo.png";
import "../../styles/SignIn.style.css";
import authApi from "../../utils/authApi";

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

      alert("로그인 성공!");
      navigate("/");
    } catch (err) {
      alert("로그인 실패: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-logo-wrapper" onClick={() => navigate("/")}>
        <img src={LogoImg} alt="NnBook 로고" className="signin-logo-img" />
      </div>
      <form onSubmit={handleSubmit} className="signin-form">
        <div className="mb-3">
          <input
            placeholder="이메일"
            type="email"
            name="email"
            className="input-underline"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <input
            placeholder="비밀번호"
            type="password"
            name="password"
            className="input-underline"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-dark w-100">
          로그인
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary w-100 mt-2"
          onClick={() => navigate("/login/signup")}
        >
          회원가입
        </button>
      </form>
    </div>
  );
}

export default SignIn;

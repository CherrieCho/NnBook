import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoImg from "../../assets/NnBook-Logo.png";
import "./styles/SignUp.style.css";
import authApi from "../../utils/authApi";

const genreOptions = [
  { id: "1", name: "소설/시/희곡" },
  { id: "55889", name: "에세이" },
  { id: "366", name: "자기계발" },
  { id: "170", name: "경제경영" },
  { id: "2105", name: "고전" },
  { id: "2551", name: "만화" },
  { id: "1196", name: "여행" },
  { id: "74", name: "역사" },
  { id: "351", name: "컴퓨터/인터넷" },
  { id: "987", name: "과학기술" },
  { id: "798", name: "사회과학" },
  { id: "656", name: "인문학" },
  { id: "1237", name: "종교/역학" },
  { id: "315", name: "인물/평전" },
  { id: "517", name: "예술/대중문화" },
  { id: "1230", name: "가정/건강/뷰티" },
  { id: "55890", name: "건강/취미/레저" },
  { id: "2030", name: "좋은부모" },
  { id: "13789", name: "유아" },
  { id: "1108", name: "어린이" },
  { id: "50246", name: "초등참고서" },
  { id: "50245", name: "중/고등참고서" },
  { id: "8257", name: "대학교재" },
  { id: "4446", name: "참고서/학습서" },
  { id: "1137", name: "청소년" },
  { id: "2913", name: "잡지" },
  { id: "1383", name: "수험서/자격증" },
  { id: "17195", name: "전집/중고전집" },
  { id: "4395", name: "사전/기타" },
];

function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
    name: "",
    location: "",
    city: "",
    latitude: "",
    longitude: "",
  });
  const [showGenres, setShowGenres] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");
  const [emailAvailable, setEmailAvailable] = useState(null);

  const [genres, setGenres] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGenreChange = (e) => {
    const value = e.target.value;
    setGenres((prev) =>
      prev.includes(value) ? prev.filter((g) => g !== value) : [...prev, value]
    );
  };

  //위치정보
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          const address = data.address;
          // console.log(address);
          const province = address.province || "";
          const city = address.city || address.county || address.state || "";
          const borough =
            address.borough || address.suburb || "";

          //주소유형에 따라 다른 값 표시
          const locationValue = province ? `${province}` : `${city}`;
          const cityValue = province ? `${city}` : `${borough}`;

          setForm({
            ...form,
            location: locationValue,
            city: cityValue,
            latitude: latitude,
            longitude: longitude,
          });
        } catch {
          setForm({
            ...form,
            location: "위치 정보 불러오기 실패",
            city: "위치 상세정보 불러오기 실패"
          });
        }
      });
    } else {
      alert("이 브라우저는 위치 정보를 지원하지 않습니다.");
    }
  };

  const checkEmail = async () => {
    try {
      const res = await authApi.post("/auth/check-email", {
        email: form.email,
      });
      if (res.data.available) {
        setEmailMessage("✅ 사용 가능한 이메일입니다.");
        setEmailAvailable(true);
      } else {
        setEmailMessage("❌ 이미 사용 중인 이메일입니다.");
        setEmailAvailable(false);
      }
    } catch (err) {
      setEmailMessage("⚠️ 중복 확인 중 오류 발생");
      setEmailAvailable(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다");
      return;
    }

    if (genres.length === 0) {
      alert("관심 카테고리를 선택해주세요.");
      return;
    }

    try {
      await authApi.post("/auth/register", {
        email: form.email,
        name: form.name,
        nickname: form.nickname,
        password: form.password,
        location: form.location,
        city: form.city,
        genres: genres,
        latitude: form.latitude,
        longitude: form.longitude,
      });
      alert("정상적으로 가입되었습니다.");
      navigate("/login");
    } catch (err) {
      alert("회원가입 실패: " + (err.response?.data?.message || err.message));
    }
  };

  // console.log("폼", form);
  // console.log("장르", genres)

  return (
    <div className="signup-container">
      <div className="signup-logo-wrapper" onClick={() => navigate("/")}>
        <img
          src={LogoImg}
          alt="NnBook Logo"
          className="signup-logo-img"
          style={{ cursor: "pointer" }}
        />
      </div>

      <form onSubmit={handleSubmit}>
        <input
          className="input-underline"
          type="name"
          name="name"
          placeholder="이름"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          className="input-underline"
          type="text"
          name="nickname"
          placeholder="닉네임"
          value={form.nickname}
          onChange={handleChange}
          required
        />

        <div className="input-row">
          <input
            className="input-underline"
            type="email"
            name="email"
            placeholder="이메일"
            value={form.email}
            onChange={handleChange}
            required
          />
          <button type="button" onClick={checkEmail}>
            중복 확인
          </button>
        </div>
        {emailMessage && (
          <p
            className={`email-check-message ${
              emailAvailable ? "text-success" : "text-danger"
            }`}
          >
            {emailMessage}
          </p>
        )}

        <input
          className="input-underline"
          type="password"
          name="password"
          placeholder="비밀번호"
          value={form.password}
          onChange={handleChange}
          required
        />

        <input
          className="input-underline"
          type="password"
          name="confirmPassword"
          placeholder="비밀번호 확인"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />

        <button
          className="genre-toggle"
          type="button"
          onClick={() => setShowGenres(!showGenres)}
        >
          {showGenres ? "관심 카테고리" : "카테고리 선택"}
        </button>

        {showGenres && (
          <div className="genre-group">
            {genreOptions.map((genre) => (
              <label key={genre.id}>
                <input
                  type="checkbox"
                  value={genre.name}
                  onChange={handleGenreChange}
                  checked={genres.includes(genre.name)}
                />
                {genre.name}
              </label>
            ))}
          </div>
        )}

        <div className="location-group">
          <input
            className="input-underline location-input"
            type="text"
            name="location"
            placeholder="위치"
            value={form.location}
            onChange={handleChange}
            readOnly
          />
          <input
            className="input-underline location-input"
            type="text"
            name="location"
            placeholder="상세위치"
            value={form.city}
            onChange={handleChange}
            readOnly
          />
          <button type="button" onClick={getLocation}>
            위치 검색
          </button>
        </div>
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}

export default SignUp;

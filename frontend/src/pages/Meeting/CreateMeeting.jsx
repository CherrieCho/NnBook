import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";
import { useCreateMeeting } from "../../hooks/Meeting/useCreateMeeting";
import "./styles/CreateMeeting.style.css";

const CreateMeeting = () => {
  const [form, setForm] = useState({
    leaderEmail: "",
    title: "",
    location: "",
    date: "",
    time: "",
    content: "",
  });
  const navigate = useNavigate();
  const { mutate } = useCreateMeeting();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    mutate(form, {
      onSuccess: () => {
        navigate("/meeting");
      },
      onError: (err) => {
        console.error("에러 발생:", err);
        alert(err.response?.data?.message || "모임 생성 실패");
      },
    });
  };

  return (
    <Container>
      <Row>
        <Col lg={12}>
          <div className="create-box">
            <form
              className="create-meeting-container"
              method="POST"
              action="#"
              onSubmit={handleSubmit}
            >
              <div className="create-title">
                <input
                  className="create-meeting-title"
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  maxLength="50"
                  placeholder="제목"
                  required
                />
              </div>
              <div>
                <label htmlFor="input-email">이메일 </label>
                <input
                  type="email"
                  name="leaderEmail"
                  value={form.leaderEmail}
                  onChange={handleChange}
                  placeholder="계정 이메일을 입력하세요"
                  id="input-email"
                  required
                ></input>
              </div>

              <div>
                <label htmlFor="location-dropdown">지역</label>
                <select
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  id="location-dropdown"
                  required
                >
                  <option value="">선택</option>
                  <option value="seoul">서울</option>
                  <option value="incheon">인천</option>
                  <option value="daejeon">대전</option>
                  <option value="daegu">대구</option>
                  <option value="busan">부산</option>
                  <option value="ulsan">울산</option>
                  <option value="gwangju">광주</option>
                  <option value="gyeonggi">경기</option>
                  <option value="gangwon">강원</option>
                  <option value="chungcheong">충청</option>
                  <option value="jeolla">전라</option>
                  <option value="gyeongsang">경상</option>
                  <option value="jeju">제주</option>
                </select>
              </div>

              <div className="create-meeting-date-time">
                <div>
                  <label htmlFor="input-date">날짜</label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    id="input-date"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="input-time">시간</label>
                  <input
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    id="input-time"
                    required
                  />
                </div>
              </div>

              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                id="input-textarea"
                placeholder="내용"
                required
              ></textarea>
              <div className="button-box">
                <Button type="submit" size="lg">
                  등록
                </Button>
              </div>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateMeeting;

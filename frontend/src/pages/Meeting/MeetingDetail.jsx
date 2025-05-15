import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "../../styles/MeetingDetail.style.css";
import { useMeetingQuery } from "../../hooks/useMeetingQuery";
import { useNavigate, useParams } from "react-router";
import { useMyInfoQuery } from "../../hooks/useMyInfoQuery";
import { useDeleteMeeting } from "../../hooks/useDeleteMeeting";
import { useAllUsersQuery } from "../../hooks/useAllUserQuery";

const MeetingDetail = () => {
  const { data, isLoading, isError, error } = useMeetingQuery();
  const { data: userData } = useMyInfoQuery();
  const { data: allUsers } = useAllUsersQuery();
  const deleteMutation = useDeleteMeeting();
  const navigate = useNavigate();
  let { id } = useParams();

  const translateKorean = (location) => {
    switch (location) {
      case "seoul":
        return "서울";
        break;
      case "incheon":
        return "인천";
        break;
      case "daejeon":
        return "대전";
        break;
      case "daegu":
        return "대구";
        break;
      case "busan":
        return "부산";
        break;
      case "ulsan":
        return "울산";
        break;
      case "gwangju":
        return "광주";
        break;
      case "gyeonggi":
        return "경기";
        break;
      case "gangwon":
        return "강원";
        break;
      case "chungcheong":
        return "충청";
        break;
      case "jeolla":
        return "전라";
        break;
      case "gyeongsang":
        return "경상";
        break;
      case "jeju":
        return "제주";
        break;
    }
  };

  const handleDelete = (deleteId) => {
    if (window.confirm("정말 삭제 하시겠습니까?")) {
      deleteMutation.mutate(deleteId);
      navigate("/meeting");
    }
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <Container>
      <Row>
        <Col lg={12}>
          <div className="meeting-detail">
            <h1>
              {data?.data.map((meeting) => {
                if (meeting.id == id) {
                  return meeting.title;
                }
              })}
            </h1>
            <div className="meeting-desc">
              <p>
                지역:{" "}
                {data?.data.map((meeting) => {
                  if (meeting.id == id) {
                    return translateKorean(meeting.location);
                  }
                })}
              </p>
              <p>
                날짜:{" "}
                {data?.data.map((meeting) => {
                  if (meeting.id == id) {
                    return meeting.date.slice(0, 10);
                  }
                })}
              </p>
              <p>
                시간:{" "}
                {data?.data.map((meeting) => {
                  if (meeting.id == id) {
                    return meeting.time;
                  }
                })}
              </p>
              <p>
                작성자:{" "}
                {data?.data.map((meeting) => {
                  if (meeting.id == id) {
                    return allUsers?.map((users) => {
                      if (users.email == meeting.leaderEmail) {
                        return users.nickname;
                      }
                    });
                  }
                })}
              </p>
              <p>
                내용:{" "}
                {data?.data.map((meeting) => {
                  if (meeting.id == id) {
                    return meeting.content;
                  }
                })}
              </p>
            </div>
          </div>
          <div className="join-button-box">
            {data?.data.map((meeting) => {
              if (meeting.id == id && meeting.leaderEmail === userData?.email) {
                return (
                  <Button
                    type="button"
                    key={meeting.id}
                    size="lg"
                    onClick={() => handleDelete(meeting.id)}
                  >
                    삭제
                  </Button>
                );
              }
            })}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MeetingDetail;

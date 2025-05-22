import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router";
import { useMeetingQuery } from "../../hooks/Meeting/useMeetingQuery";
import "./styles/MeetingList.style.css";
import { useMyInfoQuery } from "../../hooks/Common/useMyInfoQuery";
import { useAllUsersQuery } from "../../hooks/Common/useAllUserQuery";

const MeetingList = ({ showWriteButton = true }) => {
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

  const navigate = useNavigate();

  const pageSize = 3;
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useMeetingQuery(page, pageSize);
  const { data: mydata } = useMyInfoQuery();
  const { data: allUsers } = useAllUsersQuery();

  const goToCreateMeeting = () => {
    if (!mydata?.email) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    } else {
      navigate("/meeting/create");
    }
  };

  const goToMeetingDetail = (id) => {
    navigate(`/meeting/${id}`);
  };

  const goToMeetingFromHome = () => {
    if (!mydata?.email) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    } else {
      navigate("/meeting");
    }
  };

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <Container className="home-meeting-list custom-container">
      <Row>
        <Col lg={12}>
          <h1 className="meeting-title" onClick={goToMeetingFromHome}>
            모임 게시판 {showWriteButton || <span>›</span>}
          </h1>
          {showWriteButton && (
            <p className="meeting-title-description">
              직접 독서 모임을 개최하여 다양한 사람들과 책과 자신의 생각을
              공유해보세요!
            </p>
          )}
        </Col>

        {!mydata?.email ? (
          <div className="custom-container container">
            <p className="non-log-in-text-area">
              누나네 책방에 가입하시고 다양한 독서 모임에 가입해보세요!
            </p>
          </div>
        ) : (
          <Col lg={12} className="meeting-background">
            <table className="meeting-table">
              <thead>
                <tr>
                  <th scope="col">제목</th>
                  <th scope="col">지역</th>
                  <th scope="col">모임 날짜</th>
                  <th scope="col">작성자</th>
                </tr>
              </thead>
              <tbody>
                {data?.data.length === 0 ? (
                  <tr>
                    <td>현재 등록된 모임이 없습니다.</td>
                  </tr>
                ) : (
                  data?.data.map((meeting) => (
                    <tr
                      key={meeting.id}
                      className="meeting-row"
                      onClick={() => goToMeetingDetail(meeting.id)}
                    >
                      <td>{meeting.title}</td>
                      <td>{translateKorean(meeting.location)}</td>
                      <td>{meeting.date.slice(0, 10)}</td>
                      <td>
                        {allUsers?.map((users) => {
                          if (users.email == meeting.leaderEmail) {
                            return users.nickname;
                          }
                        })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </Col>
        )}
      </Row>
      {showWriteButton && (
        <>
          <ReactPaginate
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={0}
            pageCount={Math.ceil(data?.data.length / 10)}
            previousLabel="<"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="previous-page"
            previousLinkClassName="page-link"
            nextClassName="next-page"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
            forcePage={page - 1}
          />
          <div className="add-button-area">
            <Button type="button" size="md" onClick={goToCreateMeeting}>
              글쓰기
            </Button>
          </div>
        </>
      )}
    </Container>
  );
};

export default MeetingList;

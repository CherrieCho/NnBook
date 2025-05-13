import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router";
import { useMeetingQuery } from "../../hooks/useMeetingQuery";
import "../../styles/MeetingList.style.css";

const MeetingList = () => {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const { data, isLoading, isError, error } = useMeetingQuery(page, pageSize);

  const navigate = useNavigate();

  const goToCreateMeeting = () => {
    navigate("/meeting/create");
  };

  const goToMeetingDetail = (id) => {
    navigate(`/meeting/${id}`);
  };

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

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

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <Container className="home-meeting-list">
      <Row>
        <Col lg={12}>
          <h1 className="meeting-title" onClick={() => navigate("/meeting")}>모임 게시판</h1>
        </Col>
        <Col lg={12}>
          <table className="meeting-table">
            <thead>
              <tr>
                <th scope="col">제목</th>
                <th scope="col">지역</th>
                <th scope="col">모임 날짜</th>
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
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <ReactPaginate
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={Math.ceil(data?.data.length / 3)}
            previousLabel="<"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
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
            <Button type="button" size="lg" onClick={goToCreateMeeting}>
              글쓰기
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MeetingList;

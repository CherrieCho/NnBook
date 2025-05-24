import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Rating from "@mui/material/Rating";
import useBookByID from "../../hooks/Common/useBookbyID";
import "./styles/BookDetail.style.css";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { useMyInfoQuery } from "../../hooks/Common/useMyInfoQuery";
import { useAddToLibraryMutation } from "../../hooks/Library/useAddToLibraryMutation";
import BookRentalModal from "../Rental/BookRentalModal";
import Loading from "../../common/Loading/Loading.jsx";
import { useLendableSingleBookQuery } from "../../hooks/Rental/useLendableSingleBook.js";

const BookDetail = () => {
  const navigate = useNavigate();

  const [canBorrow, setCanBorrow] = useState("");
  const [showModal, setShowModal] = useState(false);

  const { bookID } = useParams();
  const { data: lendabledata } = useLendableSingleBookQuery(bookID);
  const { data: bookinfo, isLoading, error } = useBookByID(bookID);
  const value = bookinfo?.subInfo?.ratingInfo.ratingScore;
  //내정보 가져오는 훅, 내서재에 추가하는 훅
  const { data: mydata } = useMyInfoQuery();
  const { mutate: addBook } = useAddToLibraryMutation();

  //책 내서재에 추가
  const addToLibrary = () => {
    if (!mydata?.email) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    } else {
      addBook({ bookID: Number(bookID), email: mydata.email });
    }
  };

  const goToAladin = () => {
    if (!mydata?.email) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    } else {
      window.open(bookinfo.link, "_blank");
    }
  };

  //책 대여가능 여부
  const canBorrowBook = () => {
    const lendableBook = lendabledata?.filter((item) => item.bookId == bookID);
    if (lendableBook?.length === 0) {
      setCanBorrow(true);
    } else {
      setCanBorrow("");
    }
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      현재 대여 불가합니다. 구매 페이지로 이동합니다.
    </Tooltip>
  );

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmitRental = (book) => {
    // 대여 신청 로직
    console.log("대여 신청된 도서:", book);
    // 여기에 실제 대여 처리 API 호출 추가 가능
  };

  // console.log("정보", bookinfo)
  // console.log("대여등록된거", lendabledata)

  useEffect(() => {
    canBorrowBook();
  }, [canBorrow]);

  if (isLoading) return <Loading />;

  if (error)
    return <Alert variant="danger">불러오기 실패: {error.message}</Alert>;

  return (
    <div>
      <Container className="detail-container">
        <div className="detail-border">
          <Row className="bookdetail-top">
            <Col className="book-image" lg={3}>
              <div className="book-image-cover">
                <img src={bookinfo.cover} />
              </div>
            </Col>
            <Col lg={9}>
              <div className="bookdetail-area">
                <div>{bookinfo.categoryName}</div>
                <h1>{bookinfo.title}</h1>
                <div className="ratings">
                  <Rating value={value} max={5} precision={0.5} readOnly />
                  <span>{value}</span>
                </div>
                <div>{bookinfo.author}</div>
                <div>{bookinfo.publisher}</div>
              </div>
              <div className="detail-buttons">
                <Button variant="primary" onClick={addToLibrary}>
                  내 서재 추가
                </Button>
                {canBorrow ? (
                  <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 100, hide: 100 }}
                    overlay={renderTooltip}
                  >
                    <span className="d-inline-block">
                      <Button
                        className="detail-purchase"
                        variant="primary"
                        onClick={goToAladin}
                      >
                        대여 불가
                      </Button>
                    </span>
                  </OverlayTrigger>
                ) : (
                  <Button variant="primary" onClick={handleOpenModal}>
                    대여 신청
                  </Button>
                )}
              </div>
            </Col>
          </Row>
          <Row className="bookdetail-bottom first-bottom-row">
            <Col lg={2} className="bottom-subtitle">
              <h2>기본 정보</h2>
            </Col>
            <Col lg={10}>
              <ul className="bookdetail-list">
                <li>{`출판일:  ${bookinfo.pubDate}`}</li>
                <li>{`쪽수:  ${bookinfo?.subInfo?.itemPage} 페이지`}</li>
                <li>{`ISBN:  ${bookinfo.isbn13}`}</li>
              </ul>
            </Col>
          </Row>
          <Row className="bookdetail-bottom">
            <Col lg={2} className="bottom-subtitle">
              <h2>도서 소개</h2>
            </Col>
            <Col lg={10}>
              <p>{bookinfo.description}</p>
            </Col>
          </Row>
        </div>
      </Container>

      <BookRentalModal
        show={showModal}
        book={bookinfo}
        onClose={handleCloseModal}
        onSubmit={handleSubmitRental}
      />
    </div>
  );
};

export default BookDetail;

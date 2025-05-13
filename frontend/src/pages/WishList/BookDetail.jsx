import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Rating from "@mui/material/Rating";
import useBookByID from "../../hooks/useBookbyID";
import "../../styles/BookDetail.style.css";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { useMyInfoQuery } from "../../hooks/useMyInfoQuery";
import { useAddToLibraryMutation } from "../../hooks/useAddToLibraryMutation";
import { useLendableBooksQuery } from "../../hooks/uselendable";

const BookDetail = () => {
  const [canBorrow, setCanBorrow] = useState("");
  const navigate = useNavigate();
  const { bookID } = useParams();
  const { data: lendabledata } = useLendableBooksQuery();
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
    }else{
      addBook({ bookID: Number(bookID), email: mydata.email });
    }
  };

  //대여신청
  const goToRental = () => {
    if (!mydata?.email) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }else{
      navigate(`/rental/${bookID}`);
    }
  };

  //책 대여가능 여부
  const canBorrowBook = () => {
    const lendableBook = lendabledata?.filter((item) => item.bookId == bookID);
    if(lendableBook?.length === 0){
      setCanBorrow(true);
    } else{
      setCanBorrow("");
    }
  }

  useEffect(() => {
    canBorrowBook();
  }, [canBorrow]);

  console.log(canBorrow)

  if (isLoading) return <div>Loading...</div>;

  if (error)
    return <Alert variant="danger">불러오기 실패: {error.message}</Alert>;

  return (
    <div>
      <Container className="detail-container">
        <Row>
          <Col className="book-image" lg={4}>
            <div className="book-image-cover">
              <img src={bookinfo.cover} />
            </div>
          </Col>
          <Col lg={8}>
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
              <Button variant="primary" size="lg" onClick={addToLibrary}>
                내 서재 추가
              </Button>
              <Button variant="primary" size="lg" onClick={goToRental} disabled = {canBorrow}>
                대여 신청
              </Button>
            </div>
          </Col>
        </Row>
        <Row className="bookdetail-bottom first-bottom-row">
          <Col lg={3} className="bottom-subtitle">
            <h2>기본 정보</h2>
          </Col>
          <Col lg={9}>
            <ul className="bookdetail-list">
              <li>{`출판일:  ${bookinfo.pubDate}`}</li>
              <li>{`쪽수:  ${bookinfo?.subInfo?.itemPage} 페이지`}</li>
              <li>{`ISBN:  ${bookinfo.isbn13}`}</li>
              <li>
                <a href={bookinfo.link}>도서 구매 링크(클릭)</a>
              </li>
            </ul>
          </Col>
        </Row>
        <Row className="bookdetail-bottom">
          <Col lg={3} className="bottom-subtitle">
            <h2>도서 소개</h2>
          </Col>
          <Col lg={9}>
            <p>{bookinfo.description}</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BookDetail;

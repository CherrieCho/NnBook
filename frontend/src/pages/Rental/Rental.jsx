import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BookCard from "../../common/BookCard/BookCard";
import "../Rental/styles/RentalList.style.css";
import { useLendableBooksQuery } from "../../hooks/Rental/uselendable";
import useBookByIDs from "../../hooks/Common/useBookbyIDArray";
import { useMyInfoQuery } from "../../hooks/Common/useMyInfoQuery";

export default function Rental() {
  const navigate = useNavigate();

  const { data: mydata, isLoading: userLoading } = useMyInfoQuery();
  // 대여 가능 도서 ID 목록 불러오기
  const { data: lendabledata } = useLendableBooksQuery();
  const lendableBooks = lendabledata?.data || [];
  //id만 뽑아오기
  const bookIds = lendableBooks?.map((item) => item.bookId) || [];

  // 각 ID에 해당하는 도서 정보 요청
  const bookQueries = useBookByIDs(bookIds);
  const isError = bookQueries.some((q) => q.isError);

  const books = bookQueries
    .filter((q) => q.isSuccess && q.data)
    .map((q) => q.data)
    .slice(0, 6); // 홈에서는 6개만 표시

  if (isError) {
    const firstError = bookQueries.find((q) => q.isError)?.error;
    return <p>에러 발생: {firstError?.message}</p>;
  }

  const goToRentalFromHome = () => {
    if (!mydata?.email) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    } else {
      navigate("/rental");
    }
  };

  // console.log(lendableBooks);

  return (
    <Container className="rental-container">
      <div className="rental-home-title">
        <h3 className="rental-list" onClick={goToRentalFromHome}>
          대여 가능 도서 목록 <span>›</span>
        </h3>
      </div>

      <Row xs={2} sm={3} md={3} lg={6} className="rental-home-list-row">
        {books.map((book) => (
          <Col key={book.itemId || book.id}>
            <BookCard book={book} />
          </Col>
        ))}
      </Row>
      {!mydata?.email ? (
        <p className="non-log-in-text-area">
          누나네 책방에 가입하시고 책을 대여해보세요!
        </p>
      ) : (
        books.length === 0 && (
          <p className="text-center mt-5">아직 등록된 대여 도서가 없습니다.</p>
        )
      )}
    </Container>
  );
}

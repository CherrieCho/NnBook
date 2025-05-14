import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BookCard from "../../common/BookCard/BookCard";
import "../../styles/RentalList.style.css";
import { useLendableBooksQuery } from "../../hooks/uselendable";
import useBookByIDs from "../../hooks/useBookbyIDArray";

export default function Rental() {
  const navigate = useNavigate();

  // 대여 가능 도서 ID 목록 불러오기
  const { data: lendabledata } = useLendableBooksQuery();
  //id만 뽑아오기
  const bookIds = lendabledata?.map((item) => item.bookId) || [];

  // 각 ID에 해당하는 도서 정보 요청
  const bookQueries = useBookByIDs(bookIds);
  const isLoading = bookQueries.some((q) => q.isLoading);
  const isError = bookQueries.some((q) => q.isError);

  const books = bookQueries
    .filter((q) => q.isSuccess && q.data)
    .map((q) => q.data)
    .slice(0, 5); // 홈에서는 5개만 표시

  if (isLoading) return <p>로딩 중…</p>;
  if (isError) {
    const firstError = bookQueries.find((q) => q.isError)?.error;
    return <p>에러 발생: {firstError?.message}</p>;
  }

  return (
    <Container className="py-4 rental-container">
      <div className="rental-home-title">
        <h1 className="mb-3 rental-list">대여 가능 도서 목록</h1>
      </div>

      <Row
        xs={1}
        sm={3}
        md={5}
        className="gx-1 gy-1 justify-content-center justify-content-sm-start"
      >
        {books.map((book) => (
          <Col key={book.itemId || book.id}>
            <BookCard book={book} />
          </Col>
        ))}

        {books.length === 0 && (
          <p className="text-center mt-5">아직 등록된 대여 도서가 없습니다.</p>
        )}
      </Row>
    </Container>
  );
}

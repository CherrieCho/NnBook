import React, { useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BookCard from "../../common/BookCard/BookCard";
import useBooks from "../../hooks/useBooks";
import useSearchBook from "../../hooks/useSearchBook";
import "../../styles/BookList.style.css";

const BookList = () => {
  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  //도서목록
  const { data: books = [], isLoading, error } = useBooks("", page);

  //도서검색
  const { data: searchBook = [], isLoading: searchloading } = useSearchBook(
    searchTerm,
    page
  );
  //.log("서치",searchBook)

  const handleSearch = () => {
    setPage(1);
    setSearchTerm(query);
  };

  const isSearching = !!searchTerm;
  const displayBooks = isSearching ? searchBook : books;

  if (isLoading || searchloading) return <p>로딩 중…</p>;
  if (error) return <Alert variant="danger">에러 발생: {error.message}</Alert>;

  return (
    <Container className="book-list-container py-4">
      <Row className="align-items-center mb-4">
        <Col xs={12} md="auto">
          <strong className="book-list-title">전체 도서 목록</strong>
        </Col>
        <Col xs={12} md="auto" className="mt-2 mt-md-0 ms-md-auto">
          <InputGroup className="book-search-group">
            <Form.Control
              className="book-search-input"
              type="text"
              placeholder="검색어를 입력하세요"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
            <Button className="book-search-button" onClick={handleSearch}>
              검색
            </Button>
          </InputGroup>
        </Col>
      </Row>

      <Row
        xs={1}
        sm={3}
        md={5}
        className="gx-1 gy-1 justify-content-center justify-content-sm-start"
      >
        {displayBooks.map((book) => (
          <BookCard
            key={book.itemId || book.id}
            book={book}
            onClick={() =>
              navigate(`/rental/${book.itemId || book.id}`, { state: { book } })
            }
          />
        ))}
      </Row>
      {displayBooks.length === 0 && (
        <p className="text-center mt-5">검색 결과가 없습니다.</p>
      )}
    </Container>
  );
};

export default BookList;

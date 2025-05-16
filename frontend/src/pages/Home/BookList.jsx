import React, { useState } from "react";
import { Alert, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BookCard from "../../common/BookCard/BookCard";
import useBooks from "../../hooks/useBooks";
import useSearchBook from "../../hooks/useSearchBook";
import SearchBar, { categories } from "../../components/SearchBar/SearchBar";
import "../../styles/BookList.style.css";
import ReactPaginate from "react-paginate";

const BookList = () => {
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  //페이지 계산
  const PAGE_SIZE = 40;
  const MAX_TOTAL = 200;

  const maxPage = Math.ceil(MAX_TOTAL / PAGE_SIZE); // 5

  const {
    data: bestsellerBooks = [],
    isLoading: isBestLoading,
    error: bestError,
  } = useBooks(page, PAGE_SIZE);

  const {
    data: searchedBooks = [],
    isLoading: isSearchLoading,
    error: searchError,
  } = useSearchBook(query, categoryId, page, PAGE_SIZE);

  console.log("베스트", bestsellerBooks)
  console.log("검색", searchedBooks)
  console.log("페이지", page)

  //검색
  const handleSearch = (q, c) => {
    setPage(1);
    setQuery(q);
    setCategoryId(c);
  };

  //페이지 이동
  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  const isSearching = !!query;
  const booksToDisplay = isSearching ? searchedBooks : bestsellerBooks;
  const isLoading = isSearching ? isSearchLoading : isBestLoading;
  const error = isSearching ? searchError : bestError;

  return (
    <Container className="book-list-container py-4">
      <div className="book-list-title-area">
        <h3 className="book-list-title">전체 도서 목록</h3>
        <SearchBar onSearch={handleSearch} />
      </div>

      {isLoading && <p>로딩 중…</p>}
      {error && <Alert variant="danger">에러 발생: {error.message}</Alert>}

      <Row
        xs={1}
        sm={3}
        md={5}
        className="gx-1 gy-1 justify-content-center justify-content-sm-start"
      >
        {booksToDisplay.map((book) => (
          <BookCard
            key={`${book.itemId}-${page}`}
            book={book}
          />
        ))}
      </Row>

      {booksToDisplay.length === 0 && !isLoading && (
        <p className="text-center mt-5">검색 결과가 없습니다.</p>
      )}

      <ReactPaginate
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={maxPage}
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
    </Container>
  );
};

export default BookList;

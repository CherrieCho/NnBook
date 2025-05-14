import React from "react";
import { Alert, Spinner } from "react-bootstrap";
import useBooks from "../../hooks/useBooks";
import "../../styles/Recommend.style.css";

const Recommend = ({ previewCount }) => {
  const { data: books, isLoading, error } = useBooks();

  if (isLoading)
    return (
      <div className="recommend-loading">
        <Spinner animation="border" />
      </div>
    );

  if (error) return <Alert variant="danger">{error.message}</Alert>;

  // 안전하게 배열 체크
  const recommended = Array.isArray(books)
    ? books.slice(0, previewCount || books.length)
    : [];

  return (
    <div className="recommend-section">
      <h2>취향 기반 추천 도서</h2>
      <div className="recommend-grid">
        {recommended.map((book, idx) => (
          <div key={idx} className="recommend-card">
            <img
              src={book.cover?.replace("/api/image-proxy?url=", "")}
              alt={book.title}
            />
            <div className="recommend-card-title">{book.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommend;

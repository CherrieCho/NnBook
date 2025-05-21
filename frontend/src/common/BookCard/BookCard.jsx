import React from "react";
import { Col } from "react-bootstrap";
import "./styles/BookCard.style.css";
import { useNavigate } from "react-router";

export default function BookCard({ book, onClick }) {
  const navigate = useNavigate();

  if (!book || !book.itemId || !book.cover || !book.title || !book.author) {
    return null;
  }

  const goToDetail = () => {
    navigate(`/books/${book.itemId}`);
  };

  return (
    <Col onClick={goToDetail} className="card-col">
      <img
        src={book.cover?.replace("/api/image-proxy?url=", "")}
        alt={book.title}
        className="img-fluid book-cover-img"
        onError={(e) => {
          e.target.src = "/fallback-image.png";
        }}
      />

      <h6 className="book-card-title" title={book.title}>
        {book.title?.split(" - ")[0].split(" (")[0].split(":")[0]}
      </h6>
    </Col>
  );
}

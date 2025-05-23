import React from "react";
import { Col } from "react-bootstrap";
import { useNavigate } from "react-router";
import "./styles/RecommendBookCard.style.css";

const RecommendBookCard = ({ book }) => {
  const navigate = useNavigate();

  if (!book || !book.itemId || !book.cover || !book.title || !book.author) {
    return null;
  }

  const goToDetail = () => {
    navigate(`/books/${book.itemId}`);
  };
  return (
    <Col onClick={goToDetail} className="recommend-card-col">
      <img
        src={book.cover?.replace("/api/image-proxy?url=", "")}
        alt={book.title}
        className="recommend-book-card-cover-img"
        onError={(e) => {
          e.target.src = "/fallback-image.png";
        }}
      />

      <div className="recommend-book-card-info-area">
        <h6 className="recommend-book-card-title">
          {book.title?.split(" - ")[0].split(" (")[0].split(":")[0]}
        </h6>
        <h6 className="recommend-book-card-author">
          {book?.author.split("(")[0]}
        </h6>
        <p className="recommend-book-card-description">
          {book.description?.length > 100
            ? book.description.slice(0, 100) + "..."
            : book.description}
        </p>
      </div>
    </Col>
  );
};

export default RecommendBookCard;

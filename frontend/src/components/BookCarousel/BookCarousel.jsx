import React from "react";
import { Carousel } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"; // 수정: react-router-dom
import "../../styles/BookCarousel.style.css";

const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

const BookCarousel = ({ books }) => {
  const navigate = useNavigate();

  const goToDetail = (id) => {
    navigate(`/books/${id}`);
  };

  if (!books || books.length === 0) return <p>도서가 없습니다.</p>;

  const groupedBooks = chunkArray(books, 4);
  const topChunks = groupedBooks.filter((_, i) => i % 2 === 0);
  const bottomChunks = groupedBooks.filter((_, i) => i % 2 === 1);

  console.log(topChunks);

  return (
    <div className="book-carousel-wrapper mt-4">
      {/* 위쪽 캐러셀 */}
      <Carousel interval={null} indicators={false} controls>
        {topChunks.map((group, idx) => (
          <Carousel.Item key={`top-${idx}`}>
            <div className="book-row">
              {group.map((book, i) => (
                <div
                  className="book-card"
                  key={i}
                  onClick={() => goToDetail(book.itemId)}
                >
                  <img
                    src={book.cover?.replace("/cover500/", "/coversum/")}
                    alt={book.title}
                  />
                  <p className="book-title">
                    {book.title?.split(" - ")[0].split(" (")[0].split(":")[0]}
                  </p>
                </div>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* 아래쪽 캐러셀 */}
      <Carousel
        interval={null}
        indicators={false}
        controls
        className="mt-4 bottom-carousel"
      >
        {bottomChunks.map((group, idx) => (
          <Carousel.Item key={`bottom-${idx}`}>
            <div className="book-row">
              {group.map((book, i) => (
                <div
                  className="book-card"
                  key={i}
                  onClick={() => goToDetail(book.itemId)}
                >
                  <img
                    src={book.cover?.replace("/cover500/", "/coversum/")}
                    alt={book.title}
                  />
                  <p className="book-title">
                    {book.title?.split(" - ")[0].split(" (")[0]}
                  </p>
                </div>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default BookCarousel;

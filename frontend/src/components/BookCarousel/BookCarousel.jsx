import React from "react";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom"; // 수정: react-router-dom
import "../../styles/BookCarousel.style.css";

const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

const BookCarousel = ({ books }) => {
  if (!books || books.length === 0) return <p>도서가 없습니다.</p>;

  const groupedBooks = chunkArray(books, 4);
  const topChunks = groupedBooks.filter((_, i) => i % 2 === 0);
  const bottomChunks = groupedBooks.filter((_, i) => i % 2 === 1);

  return (
    <div className="book-carousel-wrapper mt-5">
      {/* 위쪽 캐러셀 */}
      <Carousel interval={null} indicators={false} controls>
        {topChunks.map((group, idx) => (
          <Carousel.Item key={`top-${idx}`}>
            <div className="book-row">
              {group.map((book, i) => (
                <div className="book-card" key={book.link || i}>
                  <Link to={`/books/${book.itemId}`}>
                    <img
                      src={book.cover?.replace("/cover500/", "/coversum/")}
                      alt={book.title}
                    />
                    <div className="book-info">
                      <p className="book-title">{book.title}</p>
                      <small className="book-author">{book.author}</small>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* 아래쪽 캐러셀 */}
      <Carousel interval={null} indicators={false} controls className="mt-4">
        {bottomChunks.map((group, idx) => (
          <Carousel.Item key={`bottom-${idx}`}>
            <div className="book-row">
              {group.map((book, i) => (
                <div className="book-card" key={book.link || i}>
                  <Link to={`/books/${book.itemId}`}>
                    <img
                      src={book.cover?.replace("/cover500/", "/coversum/")}
                      alt={book.title}
                    />
                    <div className="book-info">
                      <p className="book-title">{book.title}</p>
                      <small className="book-author">{book.author}</small>
                    </div>
                  </Link>
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

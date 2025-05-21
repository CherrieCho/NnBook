import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"; // 수정: react-router-dom
import "./BookCarousel.style.css";

const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

const BookCarousel = ({ books }) => {
  const navigate = useNavigate();
  const [chunkSize, setChunkSize] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      setChunkSize(window.innerWidth <= 768 ? 4 : 5);
    };

    handleResize(); // 초기 설정
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const goToDetail = (id) => {
    navigate(`/books/${id}`);
  };

  if (!books || books.length === 0) return <p>도서가 없습니다.</p>;

  const groupedBooks = chunkArray(books, chunkSize);
  const topChunks = groupedBooks.filter((_, i) => i % 2 === 0);
  const bottomChunks = groupedBooks.filter((_, i) => i % 2 === 1);

  console.log("tt", topChunks);

  return (
    <div className="bestseller-book-carousel-wrapper">
      {/* 위쪽 캐러셀 */}
      <Carousel interval={null} indicators={false} controls>
        {topChunks.map((group, idx) => (
          <Carousel.Item key={`top-${idx}`}>
            <div className="bestseller-book-row">
              {group.map((book, i) => (
                <div
                  className="bestseller-book-card"
                  key={i}
                  onClick={() => goToDetail(book.itemId)}
                >
                  <img
                    src={book.cover?.replace("/cover500/", "/coversum/")}
                    alt={book.title}
                    className="bestseller-book-img"
                  />
                  <div className="bestseller-info-area">
                    <p className="bestseller-book-rank">{book.bestRank}</p>
                    <p className="bestseller-book-title">
                      {book.title?.split(" - ")[0].split(" (")[0].split(":")[0]}
                    </p>
                  </div>
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
            <div className="bestseller-book-row">
              {group.map((book, i) => (
                <div
                  className="bestseller-book-card"
                  key={i}
                  onClick={() => goToDetail(book.itemId)}
                >
                  <img
                    src={book.cover?.replace("/cover500/", "/coversum/")}
                    alt={book.title}
                    className="bestseller-book-img"
                  />
                  <div className="bestseller-info-area">
                    <p className="bestseller-book-rank">{book.bestRank}</p>
                    <p className="bestseller-book-title">
                      {book.title?.split(" - ")[0].split(" (")[0].split(":")[0]}
                    </p>
                  </div>
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

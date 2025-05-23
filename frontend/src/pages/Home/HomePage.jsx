import React, { Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookCarousel from "../../components/BookCarousel/BookCarousel";
import { categories } from "../../components/SearchBar/SearchBar";
import useBooks from "../../hooks/Common/useBooks";
import "./styles/HomePage.style.css";
import MeetingList from "../Meeting/MeetingList";
import Recommend from "../Recommend/Recommend";
import HomeBanner from "../../components/HomeBanner/HomeBanner";
import BestPickDuo from "../../components/BestPickDuo/BestPickDuo";
import { Container } from "react-bootstrap";
import Rental from "../Rental/Rental";
import Loading from "../../common/Loading/Loading.jsx";

const HomePage = () => {
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const navigate = useNavigate();

  const { data: books = [], error } = useBooks();

  // categoryId -> categoryName 변환용
  const categoryMap = Object.fromEntries(categories.map((c) => [c.id, c.name]));
  const selectedCategoryName = categoryMap[categoryId];

  const filteredBooks = books.filter((book) => {
    const matchTitle = query
      ? book.title?.toLowerCase().includes(query.toLowerCase())
      : true;

    const matchCategory = categoryId
      ? book.categoryName?.includes(selectedCategoryName)
      : true;

    return matchTitle && matchCategory;
  });

  return (
    <Container className="container custom-container">
      <Suspense fallback={<Loading />}>
        <HomeBanner />

        <BestPickDuo />

        <h3
          className="homepage-bestseller-title"
          onClick={() => navigate("/books")}
        >
          베스트 셀러 <span>›</span>
        </h3>
        {error && <p>에러 발생: {error.message}</p>}

        {filteredBooks.length > 0 ? (
          <BookCarousel books={filteredBooks} />
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}

        <Recommend previewCount={3} />

        <Rental />

        <MeetingList showWriteButton={false} />
      </Suspense>
    </Container>
  );
};

export default HomePage;

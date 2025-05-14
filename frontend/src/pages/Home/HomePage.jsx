import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookCarousel from "../../components/BookCarousel/BookCarousel";
import SearchBar, { categories } from "../../components/SearchBar/SearchBar";
import useBooks from "../../hooks/useBooks";
import "../../styles/HomePage.style.css";
import MeetingList from "../Meeting/MeetingList";
import Recommend from "./Recommend";
import Rental from "./Rental";

const HomePage = () => {
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const navigate = useNavigate();

  const { data: books = [], isLoading, error } = useBooks();

  // ✅ categoryId -> categoryName 변환용
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

  const handleSearch = (q, c) => {
    console.log("🔍 검색 버튼 클릭됨:", q, c);
    setQuery(q);
    setCategoryId(c);
  };

  return (
    <div className="container mt-4">
      <SearchBar onSearch={handleSearch} />

      {isLoading && <p>로딩 중…</p>}
      {error && <p>에러 발생: {error.message}</p>}

      {filteredBooks.length > 0 ? (
        <BookCarousel books={filteredBooks} />
      ) : (
        !isLoading && <p>검색 결과가 없습니다.</p>
      )}

      <div className="text-end mt-3">
        <button className="btn-custom" onClick={() => navigate("/books")}>
          더보기
        </button>
      </div>

      <MeetingList />
      <Recommend previewCount={4} />
      <div className="text-end mt-3">
        <button className="btn-custom" onClick={() => navigate("/recommend")}>
          더보기
        </button>
      </div>
      <Rental />
    </div>
  );
};

export default HomePage;

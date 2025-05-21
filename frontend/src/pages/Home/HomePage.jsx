import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookCarousel from "../../components/BookCarousel/BookCarousel";
import SearchBar, { categories } from "../../components/SearchBar/SearchBar";
import useBooks from "../../hooks/Common/useBooks";
import "./styles/HomePage.style.css";
import MeetingList from "../Meeting/MeetingList";
import Recommend from "../Recommend/Recommend";
import Rental from "./Rental";
import useBlogBest from "../../hooks/Recommend/useBlogBest";
import HomeBanner from "./HomeBanner";

const HomePage = () => {
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const navigate = useNavigate();

  const { data: books = [], isLoading, error } = useBooks();
  const {data: blogData} = useBlogBest();
  console.log("블로그", blogData)

  //데이터 중 랜덤값 가져오기
  const randomData = () => {
    const randomIndex = Math.floor(Math.random() * blogData?.length);
    return blogData?.[randomIndex]
  }

  console.log(randomData())


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
    <div className="container custom-container">
      <HomeBanner />

      <h3
        className="homepage-bestseller-title"
        onClick={() => navigate("/books")}
      >
        베스트 셀러 <span>›</span>
      </h3>
      {isLoading && <p>로딩 중…</p>}
      {error && <p>에러 발생: {error.message}</p>}

      {filteredBooks.length > 0 ? (
        <BookCarousel books={filteredBooks} />
      ) : (
        !isLoading && <p>검색 결과가 없습니다.</p>
      )}

      <Recommend previewCount={3} />

      <Rental />

      <MeetingList showWriteButton={false} />
    </div>
  );
};

export default HomePage;

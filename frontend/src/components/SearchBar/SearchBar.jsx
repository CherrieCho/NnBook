import React, { useState } from "react";
import "./SearchBar.style.css";

export const categories = [
  { id: "", name: "장르" },
  { id: "170", name: "건강/취미" },
  { id: "2105", name: "경제경영" },
  { id: "1230", name: "공무원 수험서" },
  { id: "987", name: "과학" },
  { id: "336", name: "달력/기타" },
  { id: "8257", name: "대학교재" },
  { id: "2551", name: "만화" },
  { id: "798", name: "사회과학" },
  { id: "1", name: "소설/시/희곡" },
  { id: "1383", name: "수험서/자격증" },
  { id: "1108", name: "어린이" },
  { id: "55890", name: "에세이" },
  { id: "1196", name: "여행" },
  { id: "74", name: "역사" },
  { id: "517", name: "예술/대중문화" },
  { id: "1322", name: "외국어" },
  { id: "1237", name: "요리/살림" },
  { id: "2030", name: "유아" },
  { id: "656", name: "인문학" },
  { id: "3366", name: "자기계발" },
  { id: "55889", name: "잡지" },
  { id: "50943", name: "장르소설" },
  { id: "1853", name: "전집/중고전집" },
  { id: "1236", name: "종교/역학" },
  { id: "6009", name: "좋은부모" },
  { id: "89663", name: "청소년" },
  { id: "351", name: "컴퓨터/모바일" },
  { id: "3839", name: "초등참고서" },
  { id: "50246", name: "중학참고서" },
  { id: "76000", name: "고등참고서" },
];

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const handleSearch = () => {
    if (typeof onSearch === "function") {
      // console.log("🔍 검색 요청 상태:", { query, categoryId });
      onSearch(query, categoryId);
    } else {
      console.warn("onSearch 함수가 정의되지 않았습니다.");
    }
  };

  return (
    <div className="search-bar-wrapper">
      <select
        className="custom-category-select"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
      >
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        className="custom-search-input"
        placeholder="도서 제목 검색"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
      <button
        className="custom-search-btn"
        onClick={handleSearch}
        aria-label="검색"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M10 2a8 8 0 105.293 14.293l5.707 5.707 1.414-1.414-5.707-5.707A8 8 0 0010 2zm0 2a6 6 0 110 12A6 6 0 0110 4z" />
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;

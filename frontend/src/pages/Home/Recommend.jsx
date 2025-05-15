import React from "react";
import { Alert, Spinner } from "react-bootstrap";
import "../../styles/Recommend.style.css";
import { useNavigate } from "react-router-dom";
import useRecommendedBooks from "../../hooks/useRecommendedBooks";
import { useMyInfoQuery } from "../../hooks/useMyInfoQuery";
import useUserGenres from "../../hooks/useUserGenres";

const genreOptions = [
  { id: "1", name: "소설/시/희곡" },
  { id: "55889", name: "에세이" },
  { id: "366", name: "자기계발" },
  { id: "170", name: "경제경영" },
  { id: "2105", name: "고전" },
  { id: "2551", name: "만화" },
  { id: "1196", name: "여행" },
  { id: "74", name: "역사" },
  { id: "351", name: "컴퓨터/인터넷" },
  { id: "987", name: "과학기술" },
  { id: "798", name: "사회과학" },
  { id: "656", name: "인문학" },
  { id: "1237", name: "종교/역학" },
  { id: "315", name: "인물/평전" },
  { id: "517", name: "예술/대중문화" },
  { id: "1230", name: "가정/건강/뷰티" },
  { id: "55890", name: "건강/취미/레저" },
  { id: "2030", name: "좋은부모" },
  { id: "13789", name: "유아" },
  { id: "1108", name: "어린이" },
  { id: "50246", name: "초등참고서" },
  { id: "50245", name: "중/고등참고서" },
  { id: "8257", name: "대학교재" },
  { id: "4446", name: "참고서/학습서" },
  { id: "1137", name: "청소년" },
  { id: "2913", name: "잡지" },
  { id: "1383", name: "수험서/자격증" },
  { id: "17195", name: "전집/중고전집" },
  { id: "4395", name: "사전/기타" },
];

const Recommend = ({ previewCount }) => {
  const navigate = useNavigate();

  const { data: mydata, isLoading: userLoading } = useMyInfoQuery();
  const { data: genres, isLoading: genresLoading } = useUserGenres(
    mydata?.email
  );

  const genreName = genres?.[0]?.genre || null;
  const matchedGenre = genreOptions.find((option) => option.name === genreName);
  const categoryId = matchedGenre ? matchedGenre.id : null;

  const {
    data: books,
    isLoading: booksLoading,
    error,
  } = useRecommendedBooks(categoryId);

  const goToDetail = (id) => {
    navigate(`/books/${id}`);
  };

  const isLoading = userLoading || genresLoading || booksLoading;

  if (isLoading) {
    return (
      <div className="recommend-loading">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) return <Alert variant="danger">{error.message}</Alert>;

  // 안전하게 배열 체크
  const recommended = Array.isArray(books)
    ? books.slice(0, previewCount || books.length)
    : [];

  console.log(recommended);

  return (
    <div className="recommend-section">
      <h1 onClick={() => navigate("/recommend")}>취향 기반 추천 도서</h1>
      <div className="recommend-grid">
        {recommended.map((book, idx) => (
          <div
            key={idx}
            className="recommend-card"
            onClick={() => goToDetail(book.itemId)}
          >
            <img
              src={book.cover?.replace("/api/image-proxy?url=", "")}
              alt={book.title}
            />
            <div className="recommend-card-title">
              {book.title?.split(" - ")[0].split(" (")[0]}
            </div>
          </div>
        ))}
      </div>
      {recommended.length === 0 && (
        <p className="text-center mt-5">취향 기반 도서가 없습니다.</p>
      )}
    </div>
  );
};

export default Recommend;

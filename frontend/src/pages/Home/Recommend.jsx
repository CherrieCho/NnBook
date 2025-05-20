import React from "react";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import "../../styles/Recommend.style.css";
import { useNavigate } from "react-router-dom";
import useRecommendedBooks from "../../hooks/useRecommendedBooks";
import { useMyInfoQuery } from "../../hooks/useMyInfoQuery";
import useUserGenres from "../../hooks/useUserGenres";
import BookCard from "../../common/BookCard/BookCard";

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
    <Container className="recommend-section">
      <div className="rental-title">
        <h1 onClick={() => navigate("/recommend")}>취향 기반 추천 도서</h1>
      </div>
      <Row
        xs={1}
        sm={3}
        md={5}
        className="gx-1 gy-1 justify-content-center justify-content-sm-start"
      >
        {recommended.map((book, idx) => (
          <Col>
            <BookCard book={book} />
          </Col>
        ))}
      </Row>
      {!mydata?.email && (
        <p className="text-center mt-5">
          누나네 책방에 가입하시고 취향에 맞는 도서를 추천받아보세요.
        </p>
      )}
    </Container>
  );
};

export default Recommend;

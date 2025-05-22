import React from "react";
import { Alert, Container, Row, Spinner } from "react-bootstrap";
import "./styles/RecommendList.style.css";
import { useNavigate } from "react-router-dom";
import useRecommendedBooks from "../../hooks/Recommend/useRecommendedBooks";
import { useMyInfoQuery } from "../../hooks/Common/useMyInfoQuery";
import useUserGenres from "../../hooks/Recommend/useUserGenres";
import { useState } from "react";
import ReactPaginate from "react-paginate";
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

const Recommend = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  //페이지 계산
  const PAGE_SIZE = 20;
  const MAX_TOTAL = 200;

  const maxPage = Math.ceil(MAX_TOTAL / PAGE_SIZE); // 5

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
  } = useRecommendedBooks(categoryId, page, PAGE_SIZE);

  const goToDetail = (id) => {
    navigate(`/books/${id}`);
  };

  //페이지 이동
  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
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

  console.log(books);

  return (
    <Container className="book-list-container py-4">
      <div className="rental-title">
        <h3 onClick={() => navigate("/recommend")}>취향 기반 추천 도서</h3>
      </div>
      <Row
        xs={1}
        sm={3}
        md={5}
        className="gx-1 gy-1 justify-content-center justify-content-sm-start"
      >
        {books?.map((book, idx) => (
          <BookCard book={book} />
        ))}
      </Row>
      <ReactPaginate
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={0}
        pageCount={maxPage}
        previousLabel="<"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="previous-page"
        previousLinkClassName="page-link"
        nextClassName="next-page"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
        forcePage={page - 1}
      />
    </Container>
  );
};

export default Recommend;

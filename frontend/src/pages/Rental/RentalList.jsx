import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import BookCard from "../../common/BookCard/BookCard";
import "./styles/RentalList.style.css";
import { useNavigate } from "react-router-dom";
import { useLendableBooksQuery } from "../../hooks/Rental/uselendable";
import useBookByIDs from "../../hooks/Common/useBookbyIDArray";
import ReactPaginate from "react-paginate";
import { useAllUsersQuery } from "../../hooks/Common/useAllUserQuery";
import { useMyInfoQuery } from "../../hooks/Common/useMyInfoQuery";
import { keyframes } from "@emotion/react";

const RentalList = () => {
  const navigate = useNavigate();

  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [sortByDistance, setSortByDistance] = useState(false);

  const { data: mydata } = useMyInfoQuery();
  const { data: allUsers } = useAllUsersQuery();
  


  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  //대여가능한 도서
  const { data: lendabledata } = useLendableBooksQuery(page, pageSize);
  //응답으로 받아온 데이터 중에서 data 부분이랑 totalCount부분 분리
  const lendableBooks = lendabledata?.data || [];
  const totalCount = lendabledata?.totalCount || 0;

  const bookIds = lendableBooks?.map((item) => item.bookId) || [];
  const bookQueries = useBookByIDs(bookIds);

  const isLoading = bookQueries.some((q) => q.isLoading);
  const isError = bookQueries.some((q) => q.isError);

  const books = bookQueries
    .filter((q) => q.isSuccess && q.data)
    .map((q) => q.data);

  let displayBooks = books.map((book, index) => {
    const ownerEmail = lendableBooks[index]?.ownerEmail;
    const ownerInfo = allUsers?.find((user) => user.email === ownerEmail);

    let distance = null;
    if (
      mydata?.latitude &&
      mydata?.longitude &&
      ownerInfo?.latitude &&
      ownerInfo?.longitude
    ) {
      distance = getDistanceFromLatLonInKm(
        parseFloat(mydata.latitude),
        parseFloat(mydata.longitude),
        parseFloat(ownerInfo.latitude),
        parseFloat(ownerInfo.longitude)
      );
    }

    return {
      ...book,
      distance: distance ? parseFloat(distance) : null,
    };
  });

  if (sortByDistance) {
    displayBooks = [...displayBooks].sort((a, b) => {
      // 거리 정보 없으면 뒤로 보냄
      if (a.distance === null) return 1;
      if (b.distance === null) return -1;

      return a.distance - b.distance;
    });
  }

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d.toFixed(2);
  }

  if (isLoading) return <p>로딩 중…</p>;
  if (isError) {
    const firstError = bookQueries.find((q) => q.isError)?.error;
    return <p>에러 발생: {firstError?.message}</p>;
  }

  return (
    <>
      <Container className="rental-list-container">
        <Row className="rental-title-area justify-content-between align-items-center">
          <Col xs={12} md="auto">
            <h1 className="rental-list-page">대여 가능 도서 목록</h1>
            <p className="rental-list-sub">원하는 도서를 가까운 이웃에게서 빌려 보세요!</p>
          </Col>
        </Row>
        <Row className="sort-distance-button">
          <Col xs="auto">
            <Button
              className="rental-distance-button"
              onClick={() => setSortByDistance((prev) => !prev)}
            >
              {sortByDistance ? "등록순" : "가까운순"}
            </Button>
          </Col>
        </Row>
        <Row
          xs={1}
          sm={3}
          md={4}
          lg={5}
          className="gx-1 gy-1 justify-content-center justify-content-sm-start"
        >
          {displayBooks.map((book, idx) => (
            <div className="mb-3 text-center" key={idx}>
              <BookCard book={book} />
              <p className="distance-info">
                {book.distance !== null
                  ? `${book.distance}km`
                  : "거리 정보가 없습니다."}
              </p>
            </div>
          ))}
        </Row>
        {displayBooks.length === 0 && (
          <p className="text-center mt-5">검색 결과가 없습니다.</p>
        )}

        <ReactPaginate
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={0}
          pageCount={Math.ceil(totalCount / pageSize)}
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
    </>
  );
};

export default RentalList;

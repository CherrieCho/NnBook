import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import BookCard from "../../common/BookCard/BookCard";
import "../../styles/RentalList.style.css";
import { useNavigate } from "react-router-dom";
import { useLendableBooksQuery } from "../../hooks/uselendable";
import useBookByIDs from "../../hooks/useBookbyIDArray";
import ReactPaginate from "react-paginate";
import { useMyInfoQuery } from "../../hooks/useMyInfoQuery";

const RentalList = () => {
  const navigate = useNavigate();
  const { data: mydata } = useMyInfoQuery();
  const [page, setPage] = useState(1);
  const pageSize = 15;

  // 페이지 클릭
  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  // 대여가능 도서 데이터 가져오기
  const { data: lendabledata = [] } = useLendableBooksQuery(page, pageSize);

  // 책 ID 배열 추출 후 알라딘 데이터 요청
  const bookIds = lendabledata.map((item) => item.bookId);
  const bookQueries = useBookByIDs(bookIds);

  // 로딩/에러 처리
  const isLoading = bookQueries.some((q) => q.isLoading);
  const isError = bookQueries.some((q) => q.isError);

  // 알라딘 데이터 정제
  const books = bookQueries
    .filter((q) => q.isSuccess && q.data)
    .map((q) => q.data);

  // 거리 정렬 관련 상태
  const [sortedBooks, setSortedBooks] = useState([]);
  const [isDistanceLoading, setIsDistanceLoading] = useState(true);

  // 거리 기반 정렬
  useEffect(() => {
    const fetchAndSortByDistance = async () => {
      if (!mydata?.location || lendabledata.length === 0 || books.length === 0)
        return;

      const myCoords = await getCoordsFromAddress(mydata.location);
      if (!myCoords) return;

      const booksWithDistance = await Promise.all(
        lendabledata.map(async (item) => {
          const coords = await getCoordsFromAddress(item.location);
          if (!coords) return null;

          const distance = getDistanceFromLatLonInKm(
            myCoords.lat,
            myCoords.lon,
            coords.lat,
            coords.lon
          );

          return {
            ...item,
            distance,
            aladinBook: books.find(
              (b) => b.itemId === item.bookId || b.id === item.bookId
            ),
          };
        })
      );

      const filtered = booksWithDistance
        .filter((b) => b !== null && b.aladinBook)
        .sort((a, b) => a.distance - b.distance);

      setSortedBooks(filtered);
      setIsDistanceLoading(false);
    };

    fetchAndSortByDistance();
  }, [mydata, lendabledata, books]);

  // 주소 -> 위도/경도 변환
  const getCoordsFromAddress = async (address) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          address
        )}&format=json&limit=1`
      );
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        return { lat: parseFloat(lat), lon: parseFloat(lon) };
      } else {
        return null;
      }
    } catch (error) {
      console.error("위치 정보를 가져오는 데 실패했습니다:", error);
      return null;
    }
  };

  // 거리 계산 (하버사인 공식)
  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  if (isLoading) return <p>로딩 중…</p>;
  if (isError) {
    const firstError = bookQueries.find((q) => q.isError)?.error;
    return <p>에러 발생: {firstError?.message}</p>;
  }

  console.log(lendabledata);

  return (
    <Container className="py-4 rental-container">
      <Row className="align-items-center mb-5">
        <Col xs={12} md="auto">
          <strong className="rental-list">대여 가능 도서 목록</strong>
        </Col>
      </Row>

      {isDistanceLoading ? (
        <p className="text-center">거리 기준 정렬 중...</p>
      ) : (
        <>
          <Row
            xs={1}
            sm={3}
            md={5}
            className="gx-1 gy-1 justify-content-center justify-content-sm-start"
          >
            {sortedBooks.map((item) => (
              <Col key={item.bookId}>
                <BookCard book={item.aladinBook} />
                <p className="distance-text">{item.distance.toFixed(1)}km</p>
              </Col>
            ))}
          </Row>
          {sortedBooks.length === 0 && (
            <p className="text-center mt-5">검색 결과가 없습니다.</p>
          )}
        </>
      )}

      <ReactPaginate
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={Math.ceil(lendabledata.length / 15)}
        previousLabel="<"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
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

export default RentalList;

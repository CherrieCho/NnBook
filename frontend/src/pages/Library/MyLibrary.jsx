import React from "react";
import "./styles/MyLibrary.style.css";
import { useMyInfoQuery } from "../../hooks/Common/useMyInfoQuery";
import { Alert } from "react-bootstrap";
import SingleLineCarousel from "../../common/react-multi-carousel/SingleLineCarousel";
import { useReadingBooksQuery } from "../../hooks/Library/useReadingBooks";
import { useFinishedBooksQuery } from "../../hooks/Library/useFinishedBooks";
import { useLendedBooksQuery } from "../../hooks/Rental/useLendedBooks";
import { useFinishedBooksBorrowQuery } from "../../hooks/Library/usedFinishedBooksForBorrowed";
import { useReadingBooksBorrowQuery } from "../../hooks/Library/useReadingBooksForBorrowed";
import Loading from "../../common/Loading/Loading";

const MyLibrary = () => {
  const { data: mydata, isLoading, isError, error } = useMyInfoQuery();

  const { data: readingdata } = useReadingBooksQuery();
  const { data: finisheddata } = useFinishedBooksQuery();
  const { data: lendeddata } = useLendedBooksQuery();

  //빌린책테이블에서 온 데이터
  const { data: readingDataBorrowed } = useReadingBooksBorrowQuery();
  const { data: finishedDataBorrowed } = useFinishedBooksBorrowQuery();

    //읽고있는 책, 다읽은 책에 빌린 책 포함시키기
  const readingDataPlusBorrowed =
  (readingdata?.length ? readingdata : []).concat(
    readingDataBorrowed?.length ? readingDataBorrowed : []
  );
  const finishedDataPlusBorrowed = 
  (finisheddata?.length ? finisheddata : []).concat(
    finishedDataBorrowed?.length ? finishedDataBorrowed : []
  );

  // console.log("data", mydata);
  // console.log("rb", readingdata);
  // console.log("fb", finisheddata);
  // console.log("lb", lendeddata);

  if (isLoading) return <Loading />;

  if (isError)
    return <Alert variant="danger">불러오기 실패: {error.message}</Alert>;

  return (
    <div className="libraryContainer container">
      <h1 className="libraryNameTitle">{mydata.nickname}님의 서재</h1>
      <div className="section mt-3">
        <h3 className="libraryTitle mb-3">읽고 있는 도서</h3>
        <div className="libraryBoxStroke libraryBookList">
          <div>
            {readingDataPlusBorrowed?.length > 0 && (
              <SingleLineCarousel books={readingDataPlusBorrowed} />
            )}
          </div>
        </div>
      </div>
      <div className="section mt-5">
        <h3 className="libraryTitle mb-3">완독 도서</h3>
        <div className="libraryBoxStroke libraryBookList">
          <div>
            {finishedDataPlusBorrowed?.length > 0 && (
              <SingleLineCarousel books={finishedDataPlusBorrowed} libraryBookStatus="finished"/>
            )}
          </div>
        </div>
      </div>
      <div className="section mt-5">
        <h3 className="libraryTitle mb-3">빌려준 도서</h3>
        <div className="libraryBoxStroke libraryBookList">
          <div>
            {lendeddata?.length > 0 && (
              <SingleLineCarousel books={lendeddata} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyLibrary;

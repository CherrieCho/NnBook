import React from "react";
import { Alert } from "react-bootstrap";
import "/src/styles/CarouselCard.style.css";
import useBookByID from "../../hooks/useBookbyID";
import { useNavigate } from "react-router";
import { useAddToLibraryMutation } from "../../hooks/useAddToLibraryMutation"; // 추가된 훅
import { useRegisterBookLendMutation } from "../../hooks/useRegisterBookLendMutation"; // 추가된 훅
import { useMyInfoQuery } from "../../hooks/useMyInfoQuery";
import { useBorrowingBooksQuery } from "../../hooks/useBorrowingBooks";

export default function BookCard({ bookID, libraryBookStatus, email }) {
  const { data: bookinfo, isLoading, isError, error } = useBookByID(bookID);
  const {data: borrowdata} = useBorrowingBooksQuery();
  const navigate = useNavigate();

  const {data: mydata} = useMyInfoQuery();
  const { mutate: registerBookLend } = useRegisterBookLendMutation();

  const moveToDetail = (bookID) => {
    navigate(`/library/${bookID}`);
  };

  const location = mydata?.location;
  const handleRegisterLend = () => {
    registerBookLend({ bookID, location });
  };

  // console.log(bookinfo)

  if (isLoading) return <div>Loading...</div>;

  if (isError)
    return <Alert variant="danger">불러오기 실패: {error.message}</Alert>;

  return (
    <div className="bookcard-contents" onClick={() => moveToDetail(bookID)}>
      <img
        src={bookinfo?.cover?.replace("/api/image-proxy?url=", "")}
        alt={bookinfo?.title}
        className="img-fluid book-cover-img"
        onError={(e) => {
          e.target.src = "/fallback-image.png";
        }}
      />
      {libraryBookStatus === "finished" && !borrowdata?.find((book) => book?.bookID === bookID) && (
        <button className="lend-btn " onClick={handleRegisterLend}>대여 등록</button>
      )}
    </div>
  );
}

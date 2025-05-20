import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import "/src/styles/CarouselCard.style.css";
import useBookByID from "../../hooks/useBookbyID";
import { useNavigate } from "react-router";
import { useAddToLibraryMutation } from "../../hooks/useAddToLibraryMutation";
import { useRegisterBookLendMutation } from "../../hooks/useRegisterBookLendMutation";
import { useMyInfoQuery } from "../../hooks/useMyInfoQuery";
import BookRentalRegistrationModal from "../../pages/Library/BookRentalRegistrationModal";
import { useBorrowingBooksQuery } from "../../hooks/useBorrowingBooks";
import { useMyLendableQuery } from "../../hooks/useBooksIRegistered";
import { useLendedBooksQuery } from "../../hooks/useLendedBooks";

export default function BookCard({ bookID, libraryBookStatus, email }) {
  const navigate = useNavigate();

  const { data: bookinfo, isLoading, isError, error } = useBookByID(bookID);
  const { data: mydata } = useMyInfoQuery();
  const { data: borrowdata } = useBorrowingBooksQuery();
  const { data: mylendabledata } = useMyLendableQuery();
  const { data: lendeddata } = useLendedBooksQuery();
  const { mutate: registerBookLend } = useRegisterBookLendMutation();

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const location = mydata?.location;

  const handleSubmit = (book) => {
    registerBookLend({ bookID, location });
  };

  const handleBookReturn = (book) => {
    registerBookLend({ bookID, location });
  };

  const moveToDetail = (bookID) => {
    navigate(`/library/${bookID}`);
  };

  if (isLoading) return <div>Loading...</div>;

  if (isError)
    return <Alert variant="danger">불러오기 실패: {error.message}</Alert>;

  return (
    <div
      className="bookcard-contents"
      onClick={(e) => {
        if (showModal) return;
        moveToDetail(bookID);
      }}
    >
      <img
        src={bookinfo?.cover?.replace("/api/image-proxy?url=", "")}
        alt={bookinfo?.title}
        className="img-fluid book-cover-img"
        onError={(e) => {
          e.target.src = "/fallback-image.png";
        }}
      />
      {/* 완독한 책 중에서 내가 빌린 책, 이미 대여등록한 책, 빌려준 책 제외 대여등록 가능 */}
      {libraryBookStatus === "finished" &&
        !borrowdata?.find((book) => book?.bookID === bookID) &&
        !mylendabledata?.find((book) => book?.bookId === bookID) &&
        !lendeddata?.find((book) => book?.bookID === bookID) && (
          <button
            className="lend-btn "
            onClick={(e) => {
              e.stopPropagation();
              handleOpenModal();
            }}
          >
            대여 등록
          </button>
        )}

      {libraryBookStatus === "borrowed" && (
        <button
          className="lend-btn "
          onClick={(e) => {
            e.stopPropagation();
            handleBookReturn();
          }}
        >
          반납하기
        </button>
      )}

      <BookRentalRegistrationModal
        show={showModal}
        book={{
          ...bookinfo,
          id: bookID,
        }}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import "/src/styles/CarouselCard.style.css";
import useBookByID from "../../hooks/useBookbyID";
import { useNavigate } from "react-router";
import { useAddToLibraryMutation } from "../../hooks/useAddToLibraryMutation";
import { useRegisterBookLendMutation } from "../../hooks/useRegisterBookLendMutation";
import { useMyInfoQuery } from "../../hooks/useMyInfoQuery";
import BookRentalRegistrationModal from "../../pages/Library/BookRentalRegistrationModal";

export default function BookCard({ bookID, libraryBookStatus, email }) {
  const navigate = useNavigate();

  const { data: bookinfo, isLoading, isError, error } = useBookByID(bookID);
  const { data: mydata } = useMyInfoQuery();
  const { mutate: registerBookLend } = useRegisterBookLendMutation();

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const location = mydata?.location;
  const handleSubmit = (book) => {
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
      {libraryBookStatus === "finished" && (
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

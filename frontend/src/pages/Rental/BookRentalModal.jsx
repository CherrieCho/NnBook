import React, { useState } from "react";
import { Modal, Button, Row, Col, Card } from "react-bootstrap";
import Map from "../../components/Map/Map";
import { useBorrowMutation } from "../../hooks/Rental/useBorrowMutation";
import { useNavigate, useParams } from "react-router";
import { useLendableSingleBookQuery } from "../../hooks/Rental/useLendableSingleBook";

export default function BookRentalModal({ show, book, onClose, onSubmit }) {
  const navigate = useNavigate();
  const { bookID } = useParams();

  const { data: lendabledata } = useLendableSingleBookQuery(bookID);

  const { mutate: borrowBook } = useBorrowMutation();

  const [location, setLocation] = useState(null);
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [placeName, setPlaceName] = useState("");

  //ownerEmail 뽑기
  const owner = lendabledata?.find((rent) => rent?.bookId === book.itemId)?.ownerEmail;

  const startBorrowing = () => {
    borrowBook({ bookId: book.itemId, owner: owner });
    navigate("/mypage");
  };

  const rentInfo = lendabledata?.find((rent) => rent.bookId === book.itemId);

  // console.log(lendabledata);
  // console.log("r", rentInfo);
  // console.log("b", book);

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>도서 대여 신청</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row className="gy-4">
          <Col md={4}>
            <Card>
              <Card.Img variant="top" src={book.cover} className="book-cover" />
            </Card>
          </Col>
          <Col md={8}>
            <h2 className="book-detail-title">{book.title}</h2>
            <hr />
            <Map
              lat={rentInfo?.latitude}
              lng={rentInfo?.longitude}
              onLocationSelect={setLocation}
            />
            <p className="rental-place-text"><span>대여 장소</span> {rentInfo?.location || "정보 없음"}</p>
          </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <Button className="rental-cancel-btn" onClick={onClose}>
          취소
        </Button>
        <Button className="rental-btn" onClick={startBorrowing}>
          대여 신청
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

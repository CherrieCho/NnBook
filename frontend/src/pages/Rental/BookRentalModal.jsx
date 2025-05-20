import React, { useState } from "react";
import { Modal, Button, Row, Col, Card } from "react-bootstrap";
import Map from "../../components/Map/Map";
import { useLendableBooksQuery } from "../../hooks/uselendable";
import { useBorrowMutation } from "../../hooks/useBorrowMutation";
import { useNavigate } from "react-router";

export default function BookRentalModal({ show, book, onClose, onSubmit }) {
  const navigate = useNavigate();

  const { data: lendabledata } = useLendableBooksQuery();
  const lendableBooks = lendabledata?.data || [];
  const { mutate: borrowBook } = useBorrowMutation();

  const [location, setLocation] = useState(null);
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [placeName, setPlaceName] = useState("");

  //ownerEmail 뽑기
  const owner = lendableBooks?.find((rent) => rent?.bookId === book.itemId)?.ownerEmail;

  const startBorrowing = () => {
    borrowBook({ bookId: book.itemId, owner: owner });
    navigate("/mypage");
  };

  const rentInfo = lendableBooks?.find((rent) => rent.bookId === book.itemId);

  // console.log(lendableBooks);
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
            <p>대여 장소 : {rentInfo?.location || "정보 없음"}</p>
          </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          취소
        </Button>
        <Button className="rental-detail" onClick={startBorrowing}>
          대여 신청
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

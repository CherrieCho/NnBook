import React from "react";
import { Modal, Button, Row, Col, Card } from "react-bootstrap";
import Map from "../../components/Map/Map";

const BookRentalRegistrationModal = ({ show, book, onClose, onSubmit }) => {
  if (!book) return null;

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>도서 대여 등록</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row className="gy-4">
          <Col md={4}>
            <Card>
              <Card.Img variant="top" src={book.cover} className="book-cover" />
            </Card>
          </Col>
          <Col md={8}>
            <h2 className="book-detail-title">
              {book.title?.split(" - ")[0].split(" (")[0]}
            </h2>
            <hr />
            <p>대여자:</p>
            <input></input>
            <p>대여 장소:</p>
            <input></input>
            <p>대여 날짜:</p>
            <input></input>
            <Map lat={37.5666103} lng={126.9783882} />
          </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          취소
        </Button>
        <Button
          className="rental-register-detail"
          onClick={() => {
            onSubmit(book);
            onClose();
          }}
        >
          대여 등록
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookRentalRegistrationModal;

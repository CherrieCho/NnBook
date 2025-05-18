// src/library/components/BookRentalModal.jsx
import React from "react";
import { Modal, Button, Row, Col, Card } from "react-bootstrap";

export default function BookRentalModal({ show, book, onClose, onSubmit }) {
  if (!book) return null;

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
            <p>
              <strong>대여자 : </strong> {}
            </p>
            <p>
              <strong>대여 장소 : </strong> {}
            </p>
            <p>
              <strong>대여 날짜 : </strong> {}
            </p>
            <hr />
            <p className="book-detail-desc">{book.description}</p>
          </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          취소
        </Button>
        <Button
          className="rental-detail"
          onClick={() => {
            onSubmit(book);
            onClose();
          }}
        >
          대여 신청
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

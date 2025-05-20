import React, { useState } from "react";
import { Modal, Button, Row, Col, Card } from "react-bootstrap";
import Map from "../../components/Map/Map";
import { useMyInfoQuery } from "../../hooks/useMyInfoQuery";
import { useRegisterBookLendMutation } from "../../hooks/useRegisterBookLendMutation";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

const BookRentalRegistrationModal = ({ show, book, onClose, onSubmit }) => {

  const { data: mydata, isLoading: myLoading } = useMyInfoQuery();
  const { mutate: registerBookLend } = useRegisterBookLendMutation();

  const handleReturnBorrowedBook = () => {

    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>도서 반납</Modal.Title>
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
            <p>반납 하시겠습니까?</p>
          </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          취소
        </Button>
        <Button className="rental-register-detail" onClick={handleReturnBorrowedBook}>
          반납 하기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookRentalRegistrationModal;

import React, { useState } from "react";
import { Modal, Button, Row, Col, Card } from "react-bootstrap";
import Map from "../../components/Map/Map";
import { useMyInfoQuery } from "../../hooks/useMyInfoQuery";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

const BookRentalRegistrationModal = ({ show, book, onClose, onSubmit }) => {
  const { data: mydata, isLoading: myLoading } = useMyInfoQuery();
  const [rentalDate, setRentalDate] = useState(new Date());
  const [location, setLocation] = useState(null);
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [placeName, setPlaceName] = useState("");

  console.log(mydata);

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
            <p>대여 가능 날짜:</p>
            <DatePicker
              selected={rentalDate}
              onChange={(date) => setRentalDate(date)}
              dateFormat="yyyy-MM-dd"
              className="form-control"
              placeholderText="날짜를 선택하세요"
            />
            <p>대여 희망 장소:</p>
            <Button
              variant="outline-primary"
              onClick={() => setIsMapVisible(!isMapVisible)}
            >
              {isMapVisible ? "약속장소 숨기기" : "약속장소 선택"}
            </Button>
            {isMapVisible && (
              <>
                <Map
                  lat={mydata?.latitude}
                  lng={mydata?.longitude}
                  onLocationSelect={setLocation}
                />
                <input
                  type="text"
                  className="form-control mt-2"
                  placeholder="약속 장소명을 입력해주세요."
                  maxLength={15}
                  value={placeName}
                  onChange={(e) => setPlaceName(e.target.value)}
                />
              </>
            )}
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

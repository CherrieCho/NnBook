import React, { useState } from "react";
import { Modal, Button, Row, Col, Card } from "react-bootstrap";
import Map from "../../components/Map/Map";
import { useMyInfoQuery } from "../../hooks/Common/useMyInfoQuery";
import { useRegisterBookLendMutation } from "../../hooks/Rental/useRegisterBookLendMutation";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

const BookRentalRegistrationModal = ({ show, book, onClose, onSubmit }) => {
  const [rentalDate, setRentalDate] = useState(new Date());
  const [location, setLocation] = useState(null);
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [placeName, setPlaceName] = useState("");

  const { data: mydata, isLoading: myLoading } = useMyInfoQuery();
  const { mutate: registerBookLend } = useRegisterBookLendMutation();

  const handleRegisterLend = () => {
    if (!location || !placeName) {
      alert("약속 장소를 선택하고 이름을 입력해주세요.");
      return;
    }

    registerBookLend({
      bookID: book.id,
      email: mydata?.email,
      location: `${mydata?.location || ""} ${placeName}`,
      latitude: location.lat,
      longitude: location.lng,
    });

    onClose();
  };

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
              약속 장소 선택
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
                  placeholder="핀을 움직여 장소를 설정하고, 약속 장소명을 입력해주세요~!"
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
        <Button className="rental-register-detail" onClick={handleRegisterLend}>
          대여 등록
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookRentalRegistrationModal;

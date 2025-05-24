import React, { useState } from 'react';
import { Container, Row, Col, Button, Card, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import useBookByIDs from '../../hooks/Common/useBookbyIDArray';
import BookRentalModal from './BookRentalModal';
import './styles/RentalDetail.style.css';
import './styles/BookRentalModal.style.css';
import { useBorrowMutation } from '../../hooks/Rental/useBorrowMutation';
import { useLendableSingleBookQuery } from '../../hooks/Rental/useLendableSingleBook';
import useBookByID from '../../hooks/Common/useBookbyID';

export default function RentalDetail() {
  const { bookID } = useParams(); 
  const navigate = useNavigate();

  const { mutate: borrowBook } = useBorrowMutation();
  const { data: lendabledata } = useLendableSingleBookQuery(bookID);
  const { data: book, isLoading, isError, error } = useBookByID(bookID);

  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  //대여신청
  const startBorrowing = () => {
    borrowBook({ bookID: Number(bookID) });
    navigate('/mypage');
  }

  if (isLoading) return <p>로딩 중…</p>;
  if (isError) {
    return <Alert variant="danger">에러 발생: {error.message}</Alert>;
  }

  if (!book) {
    return (
      <Container className="py-5 text-center">
        <p>해당 도서를 찾을 수 없습니다.</p>
        <Button variant="secondary" onClick={() => navigate(`/books/${bookID}`)}>
          이전으로 돌아가기
        </Button>
      </Container>
    );
  }

  return (
    <>
      <Container className="py-4">
        <Row className="mb-4">
          <Col>
            <strong className="rental-list">도서 대여 신청</strong>
          </Col>
        </Row>
        <Card className="detail-box mb-4">
          <Card.Body>
            <Row className="gy-4">
              <Col md={4}>
                <Card className="book-detail-card">
                  <Card.Img
                    variant="top"
                    src={book.cover}
                    className="book-cover"
                  />
                </Card>
              </Col>
              <Col md={8}>
                <h2 className="book-detail-title">{book.title}</h2>
                <p><strong>저자:</strong> {book.author}</p>
                <p><strong>출판사:</strong> {book.publisher}</p>
                <p><strong>대여자 위치:</strong> {
                  lendabledata?.find(ld => ld.bookID === book.itemId || ld.bookID === book.id)?.location || '알 수 없음'
                }</p>
                <hr />
                <p className="book-detail-desc">{book.description}</p>
                <div className='rental-buttons'>
                <Button
                  size="lg"
                  className="rental-detail mt-3"
                  onClick={startBorrowing}
                >
                  대여 신청하기
                </Button>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
      <BookRentalModal
        show={showModal}
        book={book}
        onClose={closeModal}
        onSubmit={bk => {
          alert(`${bk.title} 대여 신청 완료!`);
          closeModal();
        }}
      />
    </>
  );
}

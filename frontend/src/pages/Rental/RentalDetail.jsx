import React, { useState } from 'react';
import { Container, Row, Col, Button, Card, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useLendableBooksQuery } from '../../hooks/Rental/uselendable';
import useBookByIDs from '../../hooks/Common/useBookbyIDArray';
import BookRentalModal from './BookRentalModal';
import './styles/RentalDetail.style.css';
import '/src/styles/BookRentalModal.style.css';
import { useBorrowMutation } from '../../hooks/Rental/useBorrowMutation';

export default function RentalDetail() {
  const { bookId } = useParams(); 
  const navigate = useNavigate();

  const { mutate: borrowBook } = useBorrowMutation();
  const { data: lendabledata } = useLendableBooksQuery();
  const lendableBooks = lendabledata?.data || [];
  const bookIds = lendableBooks?.map((item) => item.bookId) || [];
  const bookQueries = useBookByIDs(bookIds);

  const isLoading = bookQueries.some(q => q.isLoading);
  const isError = bookQueries.some(q => q.isError);
  const books = bookQueries.filter(q => q.isSuccess && q.data).map(q => q.data);

  const book = books.find(b => String(b.itemId || b.id || b.bookId) === bookId); // 해당 bookId의 도서만 추출

  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  //대여신청
  const startBorrowing = () => {
    borrowBook({ bookId: Number(bookId) });
    navigate('/mypage');
  }

  if (isLoading) return <p>로딩 중…</p>;
  if (isError) {
    const firstError = bookQueries.find(q => q.isError)?.error;
    return <Alert variant="danger">에러 발생: {firstError?.message}</Alert>;
  }

  if (!book) {
    return (
      <Container className="py-5 text-center">
        <p>해당 도서를 찾을 수 없습니다.</p>
        <Button variant="secondary" onClick={() => navigate(`/books/${bookId}`)}>
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
                  lendableBooks?.find(ld => ld.bookId === book.itemId || ld.bookId === book.id)?.location || '알 수 없음'
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

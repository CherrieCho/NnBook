import {
  changeLendStatus,
  changeLendStatusFalse,
  deleteBookLend,
  fetchAllBookLend,
  // FetchBorrowReq,
  FetchNewBookLend,
  findBorrowingBook,
  fetchMyBookLend,
  addBorrowBook,
  changeBorrow,
  changeBorrowStatus,
} from "../models/borrowModel.js";

import { findReadingBooks, findFinishedBooks } from "../models/libraryModel.js";

//대여도서 등록
export const addBookLend = async (req, res) => {
  const { bookID, location, latitude, longitude } = req.body;
  try {
    const { email } = req.user; //토큰에서 가져오기
    await FetchNewBookLend(bookID, email, location, latitude, longitude);

    //대여등록 상태 true로 바꾸기
    await changeLendStatus(bookID);
    return res.status(201).json({ message: "대여도서 추가 완료!" });
  } catch (error) {
    console.error("addBookLend 오류:", error);
    return res.status(500).json({ message: "서버 에러" });
  }
};

//대여가능 도서 조회
export const getAllBookLend = async (req, res) => {
  const email = req.user?.email; //토큰에서 가져오기
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  try {
    const { rows, totalCount } = await fetchAllBookLend(email, page, pageSize);
    res.status(200).json({ data: rows, totalCount });
  } catch (error) {
    console.error("❌ 도서 조회 실패:", error);
    res.status(500).json({ message: "서버 오류, 조회 실패" });
  }
};

//내가 대여등록한 도서 조회
export const getMyLendable = async (req, res) => {
  const email = req.user?.email; //토큰에서 가져오기
  try {
    const rows = await fetchMyBookLend(email);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "서버 오류, 조회 실패" });
  }
};

//도서 대여 신청
export const borrowBook = async (req, res) => {
  const { bookId, owner } = req.body;
  const { email } = req.user; //토큰에서 가져오기
  try {
    //신청하려는 책이 이미 내 서재에 있는 경우
    const existingBook = await findReadingBooks(email);
    const finishedBook = await findFinishedBooks(email);
    const borrowingBook = await findBorrowingBook(email);

    if (
      existingBook.find((result) => Number(result.bookID) === Number(bookId)) ||
      finishedBook.find((result) => Number(result.bookID) === Number(bookId))
    ) {
      return res.status(400).json({ message: "이미 서재에 추가된 도서입니다" });
    }

    if (
      borrowingBook.find((result) => Number(result.bookID) === Number(bookId))
    ) {
      return res.status(400).json({ message: "이미 해당 도서를 대여중입니다" });
    }

    //도서대여하기(대여중인 책 테이블에 새 row 추가)
    await addBorrowBook(bookId, owner, email);
    //대여가능 도서리스트에서 삭제, 대여등록 상태 바꾸기
    await deleteBookLend(bookId);
    await changeLendStatusFalse(bookId, owner);
    res.status(201).json({ message: "대여 완료!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 에러" });
  }
};

//내가 빌린 책 보기
export const getBorrowingBook = async (req, res) => {
  const { email } = req.user; //토큰에서 가져오기
  try {
    const reading = await findBorrowingBook(email);
    res.status(200).json(reading);
  } catch (error) {
    console.error("조회 실패:", error);
    res.status(500).json({ message: "조회 중 오류 발생" });
  }
};

//도서 반납하기
export const returnBook = async (req, res) => {
  const { bookID, owner } = req.body;
  const { email } = req.user; // 토큰에서 가져오기
  try {
    await changeBorrowStatus(bookID, owner);
    await changeBorrow(bookID, email);

    res.status(201).json({ message: "반납 완료" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 에러" });
  }
};

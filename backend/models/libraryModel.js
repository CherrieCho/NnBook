import { db } from "../config/db.js";

//읽고있는 도서 조회
export const findReadingBooks = async (email) => {
  const [rows] = await db.query(
    `SELECT id, bookID FROM userlibrary WHERE (ownerEmail = ? OR holderEmail = ?) AND status = "reading"`,
    [email, email]
  );
  return rows;
};

//읽고있는 도서 조회(빌린책 테이블)
export const findReadingBooksForBorrowed = async (email) => {
  const [rows] = await db.query(
    `SELECT id, bookID FROM borrowedBooks WHERE holderEmail = ? AND status = "reading"`,
    [email]
  );
  return rows;
};

//완독도서 조회
export const findFinishedBooks = async (email) => {
  const [rows] = await db.query(
    `SELECT id, bookID FROM userlibrary WHERE (ownerEmail = ? OR holderEmail = ?) AND status = "finished"`,
    [email, email]
  );
  return rows;
};

//완독도서 조회(빌린책 테이블)
export const findFinishedBooksForBorrowed = async (email) => {
  const [rows] = await db.query(
    `SELECT id, bookID FROM borrowedBooks WHERE holderEmail = ? AND status = "finished"`,
    [email]
  );
  return rows;
};

//내가 빌려준 책 조회
export const findLendedBooks = async (email) => {
  const [rows] = await db.query(
    `SELECT id, bookID FROM userlibrary WHERE ownerEmail = ? AND  isBorrowed = true`,
    [email]
  );
  return rows;
};

export const addNewBook = async (bookID, ownerEmail, holderEmail) => {
  const [result] = await db.query(
    "INSERT INTO userlibrary (bookID, ownerEmail, holderEmail) VALUES (?, ?, ?)",
    [bookID, ownerEmail, holderEmail]
  );
  return result;
};

// 완독 상태
export const changeStatus = async (bookID, email) => {
  const [result] = await db.query(
    `
    UPDATE userlibrary
    SET status = 'finished'
    WHERE bookId = ?
      AND (holderEmail = ? OR ownerEmail = ?)
    `,
    [bookID, email, email]
  );
  return result;
};

//완독으로 바꾸기(빌린책 테이블)
export const changeStatusForBorrowed = async (bookID, email) => {
  const [result] = await db.query(
    `
    UPDATE borrowedBooks
    SET status = 'finished'
    WHERE bookId = ?
      AND holderEmail = ?
    `,
    [bookID, email]
  );
  return result;
};

//좋아요하기
export const changeLike = async (bookID, email) => {
  const [result] = await db.query(
    `
    UPDATE userlibrary
    SET isLiked = true
    WHERE bookId = ?
      AND (ownerEmail = ? OR holderEmail = ?)
    `,
    [bookID, email, email]
  );
  console.log("변경된 행 수:", result.affectedRows);
  return result;
};

//좋아요하기(빌린책 테이블)
export const changeLikedForBorrowed = async (bookID, email) => {
  const [result] = await db.query(
    `
    UPDATE borrowedBooks
    SET isLiked = true
    WHERE bookId = ?
      AND holderEmail = ?
    `,
    [bookID, email, email]
  );
  console.log("변경된 행 수:", result.affectedRows);
  return result;
};

//좋아요 한 책 조회
export const findLiked = async (email) => {
  const [rows] = await db.query(
    `SELECT id, bookID FROM userlibrary WHERE (ownerEmail = ? OR holderEmail = ?) AND isLiked = true`,
    [email, email]
  );
  return rows;
};

//좋아요 한 책 조회(빌린책 테이블)
export const findLikedForBorrowed = async (email) => {
  const [rows] = await db.query(
    `SELECT id, bookID FROM borrowedBooks WHERE holderEmail = ? AND isLiked = true`,
    [email]
  );
  return rows;
};

//진척도 추가
export const addPages = async (
  bookID,
  email,
  pageNow,
  pageSum,
  progressPercent,
  readAt
) => {
  const [result] = await db.query(
    "INSERT INTO pageHistory (bookId, holderEmail, pageNow, pageSum, progressPercent, readAt) VALUES (?, ?, ?, ?, ?, ?)",
    [bookID, email, pageNow, pageSum, progressPercent, readAt]
  );
  return result;
};

//진척도 불러오기
export const getPages = async (bookID, email) => {
  const [rows] = await db.query(
    "SELECT pageNow, pageSum, progressPercent, readAt FROM pageHistory WHERE bookId = ? AND holderEmail = ?",
    [bookID, email]
  );
  return rows;
};

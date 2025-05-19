import { db } from "../config/db.js";

export const findReadingBooks = async (email) => {
  const [rows] = await db.query(
    `SELECT id, bookID FROM userlibrary WHERE (ownerEmail = ? OR holderEmail = ?) AND status = "reading"`,
    [email, email]
  );
  return rows;
};

export const findFinishedBooks = async (email) => {
  const [rows] = await db.query(
    `SELECT id, bookID FROM userlibrary WHERE (ownerEmail = ? OR holderEmail = ?) AND status = "finished"`,
    [email, email]
  );
  return rows;
};

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

export const findLiked = async (email) => {
  const [rows] = await db.query(
    `SELECT id, bookID FROM userlibrary WHERE (ownerEmail = ? OR holderEmail = ?) AND isLiked = true`,
    [email, email]
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

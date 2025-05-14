import { db } from "../config/db.js";

export const FetchNewBookLend = async (bookID, email, location) => {
  const [result] = await db.query(
    "INSERT INTO registerbooklend (bookId, ownerEmail, location) VALUES (?, ?, ?)",
    [bookID, email, location]
  );
  return result;
};

export const changeLendStatus = async (bookID) => {
  const [result] = await db.query(
    "UPDATE userlibrary SET isLendable = true WHERE bookId = ?",
    [bookID]
  );
  return result;
};

export const changeLendStatusFalse = async (bookId) => {
  const [result] = await db.query(
    "UPDATE userlibrary SET isLendable = false WHERE bookId = ?",
    [bookId]
  );
  return result;
};

export const fetchAllBookLend = async () => {
  const [rows] = await db.query("SELECT * FROM registerbooklend");
  return rows;
};

//도서대출
export const FetchBorrowReq = async (email, bookId) => {
  const [result] = await db.query(
    "UPDATE userlibrary SET isBorrowed = true, holderEmail = ? WHERE bookId = ? AND isLendable = true",
    [email, bookId]
  );
  return result;
};

//대출된 책은 대출가능 목록에서 삭제
export const deleteBookLend = async (bookId) => {
  const [result] = await db.query(
    "DELETE FROM registerbooklend WHERE bookId = ?",
    [bookId]
  );
  return result;
};

export const findBorrowingBook = async (email) => {
  const [rows] = await db.query(
    `SELECT id, bookID FROM noonalibrary.userlibrary WHERE holderEmail = ? && ownerEmail != ?`,
    [email, email]
  );
  return rows;
};

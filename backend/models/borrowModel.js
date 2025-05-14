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

export const changeLendStatusFalse = async (bookId, email) => {
  const [result] = await db.query(
    "UPDATE userlibrary SET isLendable = false, isBorrowed = true WHERE bookId = ? && holderEmail != ?",
    [bookId, email]
  );
  return result;
};

export const fetchAllBookLend = async (email) => {
  const [rows] = await db.query(
    "SELECT * FROM registerbooklend WHERE ownerEmail != ?",
    [email]
  );
  return rows;
};

//도서대출
export const FetchBorrowReq = async (bookId, owner, email) => {
  const [result] = await db.query(
    "INSERT INTO userlibrary (bookId, ownerEmail, holderEmail) VALUES (?, ?, ?)",
    [bookId, owner, email]
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
    `SELECT id, bookID FROM userlibrary WHERE holderEmail = ? && ownerEmail != ?`,
    [email, email]
  );
  return rows;
};

import { db } from "../config/db.js";

export const FetchNewBookLend = async (
  bookID,
  email,
  location,
  latitude,
  longitude
) => {
  const [result] = await db.query(
    "INSERT INTO registerbooklend (bookId, ownerEmail, location, latitude, longitude) VALUES (?, ?, ?, ?, ?)",
    [bookID, email, location, latitude, longitude]
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

//현재 대여 가능한 도서 조회
export const fetchAllBookLend = async (email) => {
  if (email) {
    // 로그인 상태: 내가 등록한 책 제외
    const [rows] = await db.query(
      "SELECT * FROM registerbooklend WHERE ownerEmail != ?",
      [email]
    );
    return rows;
  } else {
    // 비로그인 상태: 전체 목록 조회
    const [rows] = await db.query("SELECT * FROM registerbooklend");
    return rows;
  }
};

//내가 대여등록한 도서 조회
export const fetchMyBookLend = async (email) => {
  const [rows] = await db.query(
    `SELECT * FROM registerbooklend WHERE ownerEmail = ?`,
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

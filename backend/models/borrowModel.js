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

//현재 대여 가능한 도서 조회(페이지네이션 반영)
export const fetchAllBookLend = async (email, page = 1, pageSize = 10) => {
  const offset = (page - 1) * pageSize;

  let rowsQuery, countQuery, rowsParams, countParams;

  if (email) {
    rowsQuery = `SELECT * FROM registerbooklend WHERE ownerEmail != ? LIMIT ? OFFSET ?`;
    countQuery = `SELECT COUNT(*) AS total FROM registerbooklend WHERE ownerEmail != ?`;
    rowsParams = [email, pageSize, offset];
    countParams = [email];
  } else {
    rowsQuery = `SELECT * FROM registerbooklend LIMIT ? OFFSET ?`;
    countQuery = `SELECT COUNT(*) AS total FROM registerbooklend`;
    rowsParams = [pageSize, offset];
    countParams = [];
  }

  const [rows] = await db.query(rowsQuery, rowsParams);
  const [countResult] = await db.query(countQuery, countParams);
  const totalCount = countResult[0]?.total || 0;

  return { rows, totalCount };
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
// export const FetchBorrowReq = async (bookId, owner, email) => {
//   const [result] = await db.query(
//     "INSERT INTO userlibrary (bookId, ownerEmail, holderEmail) VALUES (?, ?, ?)",
//     [bookId, owner, email]
//   );
//   return result;
// };

//대출된 책은 대출가능 목록에서 삭제
export const deleteBookLend = async (bookId) => {
  const [result] = await db.query(
    "DELETE FROM registerbooklend WHERE bookId = ?",
    [bookId]
  );
  return result;
};

//대여중인 책 테이블에 책 추가(대여된 책들)
export const addBorrowBook = async (bookId, owner, email) => {
  const [result] = await db.query(
    "INSERT INTO borrowedBooks (bookId, ownerEmail, holderEmail) VALUES (?, ?, ?)",
    [bookId, owner, email]
  );
  return result;
};

//내가 빌리고 있는 책 보기
export const findBorrowingBook = async (email) => {
  const [rows] = await db.query(
    `SELECT id, bookID FROM borrowedBooks WHERE holderEmail = ?`,
    [email, email]
  );
  return rows;
};

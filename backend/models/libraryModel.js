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

export const changeLike = async (bookID, email) => {
  const [result] = await db.query(
    `
    UPDATE userlibrary
    SET isLiked = true, status = 'finished'
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

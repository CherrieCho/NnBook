import { db } from "../config/db.js";

export const findUserByEmail = async (email) => {
  const [rows] = await db.query("SELECT * FROM userinfo WHERE email = ?", [
    email,
  ]);
  return rows[0];
};

export const createUser = async (
  email,
  name,
  nickname,
  hashedPassword,
  location
) => {
  const [result] = await db.query(
    "INSERT INTO userinfo (email, name, nickname, password, location) VALUES (?, ?, ?, ?, ?)",
    [email, name, nickname, hashedPassword, location]
  );
  return result;
};

export const findAllUsers = async () => {
  const [rows] = await db.query(
    "SELECT email, name, nickname, location FROM userinfo"
  );
  return rows;
};

export const createFavGenre = async (email, genre) => {
  const [result] = await db.query(
    "INSERT INTO usergenre (email, genre) VALUES (?, ?)",
    [email, genre]
  );
  return result;
};

export const fetchMyInfo = async (email) => {
  const [rows] = await db.query(
    "SELECT email, name, nickname, location FROM userinfo WHERE email=?",
    [email]
  );
  return rows[0];
};

export const changeLocationInfo = async (email, location) => {
  const [result] = await db.query(
    "UPDATE userinfo SET location = ? WHERE email = ?",
    [email, location]
  );
  return result;
};

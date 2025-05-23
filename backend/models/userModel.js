import { db } from "../config/db.js";

export const findUserByEmail = async (email) => {
  const [rows] = await db.query("SELECT * FROM userinfo WHERE email = ?", [
    email,
  ]);
  return rows[0];
};

//회원가입
export const createUser = async (
  email,
  name,
  nickname,
  hashedPassword,
  location,
  city,
  latitude,
  longitude
) => {
  const [result] = await db.query(
    "INSERT INTO userinfo (email, name, nickname, password, location, city, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [email, name, nickname, hashedPassword, location, city, latitude, longitude]
  );
  return result;
};

export const findAllUsers = async () => {
  const [rows] = await db.query(
    "SELECT email, name, nickname, location, latitude, longitude FROM userinfo"
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
    "SELECT email, name, nickname, location, city, latitude, longitude FROM userinfo WHERE email=?",
    [email]
  );
  return rows[0];
};

//위치 변경
export const changeLocationInfo = async (
  location,
  city,
  latitude,
  longitude,
  email
) => {
  const [result] = await db.query(
    "UPDATE userinfo SET location = ?, city = ?, latitude = ?, longitude = ? WHERE email = ?",
    [location, city, latitude, longitude, email]
  );
  return result;
};

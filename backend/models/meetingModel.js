import { db } from "../config/db.js";

export const findMeetingByEmail = async (leaderEmail) => {
  const [rows] = await db.query(
    "SELECT * FROM bookclub WHERE leaderEmail = ?",
    [leaderEmail]
  );
  return rows[0];
};

export const addNewMeeting = async (
  leaderEmail,
  location,
  date,
  time,
  title,
  content
) => {
  const [result] = await db.query(
    "INSERT INTO bookclub (leaderEmail, location, date, time, title, content) VALUES (?, ?, ?, ?, ?, ?)",
    [leaderEmail, location, date, time, title, content]
  );
  return result;
};

export const deleteMeetingById = async (id) => {
  const [result] = await db.query("DELETE FROM bookclub WHERE id = ?", [id]);
  return result;
};

export const fetchAllMeetings = async (page, pageSize) => {
  const offset = (page - 1) * pageSize;
  const [rows] = await db.query(
    "SELECT * FROM bookclub ORDER BY date DESC, time DESC LIMIT ? OFFSET ?",
    [pageSize, offset]
  );
  return rows;
};

export const fetchTotalMeetingCount = async () => {
  const [rows] = await db.query("SELECT COUNT(*) AS total FROM bookclub");
  return rows[0].total;
};

export const addNewMember = async (leaderEmail, memberEmail) => {
  const [result] = await db.query(
    "INSERT INTO bookclubmember (leaderEmail, memberEmail) VALUES (?, ?)",
    [leaderEmail, memberEmail]
  );
  return result;
};

export const fetchAllMembers = async (leaderEmail) => {
  const [rows] = await db.query(
    "SELECT memberEmail FROM bookclubmember WHERE leaderEmail = ?",
    [leaderEmail]
  );
  return rows;
};

export const deleteMember = async (leaderEmail, memberEmail) => {
  const [result] = await db.query(
    "DELETE FROM bookclubmember WHERE leaderEmail = ? AND memberEmail = ?",
    [leaderEmail, memberEmail]
  );
  return result;
};

import dotenv from "dotenv";
import mysql from "mysql2/promise";
dotenv.config();

export const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// export const db = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
// });

(async () => {
  try {
    const [rows] = await db.query("SELECT 1");
    console.log("✅ DB 연결 성공:", rows);
  } catch (err) {
    console.error("❌ DB 연결 실패:", err.message);
    process.exit(1);
  }
})();

import express from "express";
import {
  getReading,
  addReading,
  getFinished,
  getLendedBooks,
  // changeToFinished,
  changeToLiked,
  getLikedBooks,
} from "../controllers/libraryController.js";
import { verifyToken } from "../middlewares/veryfyToken.js";

const router = express.Router();

// 읽고있는 도서 조회
// 다 읽은 책 조회
// 내가 대여해준 도서 조회 - isLendable true(대여등록한 책들)이란 전제 하에
// 책 내서재에 추가하기(읽는중상태로 감) - 상세페이지에서 내가 추가할경우 ownerEmail == holderEmail, 내가 빌린 책일경우 owner != holder
//책 다읽음 상태로 변경
//책 좋아요하기
router.get("/reading", verifyToken, getReading);
router.post("/reading", addReading);
router.get("/finished", verifyToken, getFinished);
// router.patch("/finished", changeToFinished);
router.get("/lended", verifyToken, getLendedBooks);
router.get("/liked", verifyToken, getLikedBooks);
router.patch("/liked", verifyToken, changeToLiked);

router.get("/reading", (req, res) => {
  const { ownerEmail, holderEmail } = req.query;
  res.json({ message: "조회 성공" });
});

router.post("/reading", (req, res) => {
  const { bookID, ownerEmail, holderEmail } = req.body;
  res.status(201).json({ message: "책 내서재에 추가됨", bookID });
});

router.get("/finished", (req, res) => {
  const { ownerEmail, holderEmail } = req.query;
  res.json({ message: "조회 성공", email });
});

router.patch("/finished", (req, res) => {
  const { bookID } = req.body;
  res.status(201).json({ message: "다 읽은 책으로 변경됨", bookID });
});

router.get("/lended", (req, res) => {
  const { ownerEmail } = req.query;
  res.json({ message: "조회 성공" });
});

router.patch("/liked", (req, res) => {
  const { bookID } = req.body;
  res.status(201).json({ message: "좋아요 표시됨", bookID });
});

router.get("/liked", (req, res) => {
  const { ownerEmail, holderEmail } = req.query;
  res.json({ message: "조회 성공" });
});

export default router;

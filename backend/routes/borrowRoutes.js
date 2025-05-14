import express from "express";
import {
  addBookLend,
  getAllBookLend,
  borrowBook,
  getBorrowingBook,
} from "../controllers/borrowController.js";
import { verifyToken } from "../middlewares/veryfyToken.js";

const router = express.Router();

//대여등록(현재 소유하고 있는 도서 중 다 읽은 책만 등록가능. 등록완료하면 library에서 대여가능 상태 true로 바꾸기)
//대여 가능한 도서 조회
//대여신청(신청하면 바로 대여될 수 있게 > isBorrowed = true, 그리고 대여가능목록에서 삭제)
//내가 대여중인 도서 조회
router.post("/booklend", verifyToken, addBookLend);
router.get("/lendables", getAllBookLend);
router.patch("/borrowreq", verifyToken, borrowBook);
router.get("/borrowing", verifyToken, getBorrowingBook);

router.post("/booklend", (req, res) => {
  const { bookID, ownerEmail, location, startDate, endDate } = req.body;
  res.status(201).json({ message: "대여가능 도서 등록 완료", bookID });
});

router.patch("/borrowreq", (req, res) => {
  const { requesterEmail, bookId } = req.body;
  res.status(201).json({ message: "대여신청 완료", bookID });
});

export default router;

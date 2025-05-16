import express from "express";
import {
  createMeeting,
  getAllMeetings,
  joinMeeting,
  getAllMembers,
  deleteMeeting,
  leaveMeeting,
} from "../controllers/meetingController.js";

const router = express.Router();

//독서모임 생성
//독서모임 조회
//모임 가입
//모임 참가멤버 조회
//모임 삭제
//모임 탈퇴
router.post("/create", createMeeting);
router.get("/view", getAllMeetings);
router.post("/join", joinMeeting);
router.get("/members", getAllMembers);
router.delete("/leave", leaveMeeting);
router.delete("/:id", deleteMeeting);

router.post("/create", (req, res) => {
  const { leaderEmail, location, date, time, bookID, title } = req.body;
  res.status(201).json({ message: "모임 추가됨" });
});

router.post("/join", (req, res) => {
  const { leaderEmail, memberEmail } = req.body;
  res.status(201).json({ message: "모임 가입 완료됨" });
});

router.get("/members", (req, res) => {
  const { leaderEmail } = req.query;
  res.json({ message: "조회 성공" });
});

router.delete("/leave", (req, res) => {
  const { leaderEmail, memberEmail } = req.body;
  res.status(201).json({ message: "모임 탈퇴 완료됨" });
});

export default router;

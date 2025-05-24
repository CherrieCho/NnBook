import {
  addNewMeeting,
  findMeetingByEmail,
  fetchAllMeetings,
  addNewMember,
  fetchAllMembers,
  deleteMeetingById,
  deleteMember,
  fetchSingleMeeting,
} from "../models/meetingModel.js";

//모임 추가
export const createMeeting = async (req, res) => {
  const { leaderEmail, location, date, time, title, content } = req.body;
  try {
    const existingLeader = await findMeetingByEmail(leaderEmail);
    if (existingLeader) {
      return res
        .status(400)
        .json({ message: "모임은 1인당 최대 한개씩만 생성 가능합니다" });
    }

    await addNewMeeting(leaderEmail, location, date, time, title, content);

    res.status(201).json({ message: "모임 추가 완료!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 에러" });
  }
};

//모임 삭제
export const deleteMeeting = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteMeetingById(id);
    res.status(200).json({ message: "삭제 성공" });
  } catch (err) {
    res.status(500).json({ message: "삭제 중 오류 발생", error: err.message });
  }
};

//모임리스트 조회
export const getAllMeetings = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 3;

    const { rows, totalCount } = await fetchAllMeetings(page, pageSize);
    res.status(200).json({ data: rows, totalCount });
  } catch (error) {
    console.error("모임 조회 실패:", error);
    res.status(500).json({ message: "서버 오류, 조회 실패" });
  }
};

//개별 모임 조회
export const getSingleMeeting = async (req, res) => {
  try {
    const { id } = req.params;
    const meetingDetail = await fetchSingleMeeting(id);
    res.status(200).json(meetingDetail);
  } catch (error) {
    console.error("모임 조회 실패:", error);
    res.status(500).json({ message: "서버 오류, 조회 실패" });
  }
};

//모임 가입
export const joinMeeting = async (req, res) => {
  const { leaderEmail, memberEmail } = req.body;
  try {
    const meetingExists = await findMeetingByEmail(leaderEmail);
    if (!meetingExists) {
      return res.status(400).json({ message: "해당 모임이 존재하지 않습니다" });
    }

    await addNewMember(leaderEmail, memberEmail);

    res.status(201).json({ message: "모임 가입 완료!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 에러" });
  }
};

//모임 멤버 조회
export const getAllMembers = async (req, res) => {
  const { leaderEmail } = req.query;
  try {
    const members = await fetchAllMembers(leaderEmail);
    res.status(200).json(members);
  } catch (error) {
    console.error("조회 실패:", error);
    res.status(500).json({ message: "조회 중 오류 발생" });
  }
};

//모임 탈퇴
export const leaveMeeting = async (req, res) => {
  try {
    const { leaderEmail, memberEmail } = req.body;
    await deleteMember(leaderEmail, memberEmail);
    res.status(200).json({ message: "삭제 성공" });
  } catch (err) {
    res.status(500).json({ message: "삭제 중 오류 발생", error: err.message });
  }
};

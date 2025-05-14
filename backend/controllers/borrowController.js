import {
  changeLendStatus,
  changeLendStatusFalse,
  deleteBookLend,
  fetchAllBookLend,
  FetchBorrowReq,
  FetchNewBookLend,
  findBorrowingBook,
} from "../models/borrowModel.js";

//대여도서 등록
export const addBookLend = async (req, res) => {
  const { bookID, location } = req.body;
  try {
    const { email } = req.user; //토큰에서 가져오기
    await FetchNewBookLend(bookID, email, location);

    //대여등록 상태 true로 바꾸기
    await changeLendStatus(bookID);
    return res.status(201).json({ message: "대여도서 추가 완료!" });
  } catch (error) {
    console.error("addBookLend 오류:", error);
    return res.status(500).json({ message: "서버 에러" });
  }
};

//대여가능 도서 조회
export const getAllBookLend = async (req, res) => {
  try {
    const rows = await fetchAllBookLend();
    console.log("📦 대여 가능 도서 리스트:", rows);
    res.status(200).json(rows);
  } catch (error) {
    console.error("❌ 대여가능 도서 조회 실패:", error.message); // ← 에러 로그 더 구체적으로
    res.status(500).json({ message: "서버 오류, 조회 실패" });
  }
};

//도서 대여 신청
export const borrowBook = async (req, res) => {
  const { bookId } = req.body;
  const { email } = req.user; //토큰에서 가져오기
  try {
    await FetchBorrowReq(email, bookId);
    //대여가능 도서리스트에서 삭제, 대여등록 상태 바꾸기
    await deleteBookLend(bookId);
    await changeLendStatusFalse(bookId);
    res.status(201).json({ message: "대여 완료!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 에러" });
  }
};

//내가 빌린 책 보기
export const getBorrowingBook = async (req, res) => {
  const { email } = req.user; //토큰에서 가져오기
  try {
    const reading = await findBorrowingBook(email);
    res.status(200).json(reading);
  } catch (error) {
    console.error("조회 실패:", error);
    res.status(500).json({ message: "조회 중 오류 발생" });
  }
};

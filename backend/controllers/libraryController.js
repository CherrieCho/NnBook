import {
  findReadingBooks,
  findFinishedBooks,
  findLendedBooks,
  addNewBook,
  changeStatus,
  changeLike,
  findLiked,
} from "../models/libraryModel.js";

//읽는중인 책
export const getReading = async (req, res) => {
  const { email } = req.user; //토큰에서 가져오기
  try {
    const reading = await findReadingBooks(email);
    res.status(200).json(reading);
  } catch (error) {
    console.error("조회 실패:", error);
    res.status(500).json({ message: "조회 중 오류 발생" });
  }
};

//다읽은책
export const getFinished = async (req, res) => {
  const { email } = req.user; //토큰에서 가져오기
  try {
    const finished = await findFinishedBooks(email);
    res.status(200).json(finished);
  } catch (error) {
    console.error("조회 실패:", error);
    res.status(500).json({ message: "조회 중 오류 발생" });
  }
};

//빌려준 책
export const getLendedBooks = async (req, res) => {
  const { email } = req.user; //토큰에서 가져오기
  try {
    const finished = await findLendedBooks(email);
    res.status(200).json(finished);
  } catch (error) {
    console.error("조회 실패:", error);
    res.status(500).json({ message: "조회 중 오류 발생" });
  }
};

//책 내서재에 추가
export const addReading = async (req, res) => {
  const { bookID, ownerEmail, holderEmail } = req.body;
  try {
    const existingBook = await findReadingBooks(ownerEmail, holderEmail);
    if (existingBook.find((result) => result.bookID === bookID)) {
      return res.status(400).json({ message: "이미 추가된 도서입니다" });
    }

    await addNewBook(bookID, ownerEmail, holderEmail);

    res.status(201).json({ message: "책 추가 완료!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 에러" });
  }
};

//읽는중 -> 다읽음으로 바꾸기
export const changeToFinished = async (req, res) => {
  const { bookID } = req.body;
  const { email } = req.user; //토큰에서 가져오기
  try {
    await changeStatus(bookID, email);
    res.status(201).json({ message: "변경 완료" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 에러" });
  }
};

//좋아요하기
export const changeToLiked = async (req, res) => {
  const { bookID } = req.body;
  const { email } = req.user; // 로그인한 유저
  try {
    await changeLike(bookID, email, email);
    res.status(201).json({ message: "변경 완료" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 에러" });
  }
};

//좋아요 한 책 불러오기
export const getLikedBooks = async (req, res) => {
  const { email } = req.user; //토큰에서 가져오기
  try {
    const reading = await findLiked(email);
    res.status(200).json(reading);
  } catch (error) {
    console.error("조회 실패:", error);
    res.status(500).json({ message: "조회 중 오류 발생" });
  }
};

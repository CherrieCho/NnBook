import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  createFavGenre,
  createUser,
  findAllUsers,
  findUserByEmail,
  fetchMyInfo,
  changeLocationInfo,
} from "../models/userModel.js";

// 이메일 중복 확인
export const checkEmail = async (req, res) => {
  const { email } = req.body;
  console.log("중복 확인 요청 이메일:", email);
  try {
    const user = await findUserByEmail(email);
    if (user) {
      return res.json({ available: false });
    }
    return res.json({ available: true });
  } catch (error) {
    console.error("이메일 중복 확인 오류:", error);
    res.status(500).json({ message: "서버 에러" });
  }
};
//회원가입
export const register = async (req, res) => {
  const { email, name, nickname, password, location, city, genres } = req.body;
  console.log("회원가입 요청", {
    email,
    name,
    nickname,
    location,
    city,
    genres,
  });

  try {
    const existingUser = await findUserByEmail(email);
    console.log("이메일 중복검사 결과", !!existingUser);

    if (existingUser) {
      return res.status(400).json({ message: "이미 가입된 이메일입니다." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("🔐 비밀번호 해시 완료");
    await createUser(email, name, nickname, hashedPassword, location, city);

    //관심장르 설정
    await Promise.all(
      genres.map((g) => {
        console.log("🎯 관심 장르 등록:", g);
        createFavGenre(email, g);
      })
    );

    res.status(201).json({ message: "회원가입 성공!" });
  } catch (error) {
    console.error("회원가입 중 오류", error);
    res.status(500).json({ message: "서버 에러" });
  }
};

//로그인
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res
        .status(400)
        .json({ message: "이메일 또는 비밀번호가 틀렸습니다." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "이메일 또는 비밀번호가 틀렸습니다." });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ message: "로그인 성공!", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 에러" });
  }
};

//사용자 조회
export const getAllUsers = async (req, res) => {
  try {
    const users = await findAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("사용자 조회 실패:", error);
    res.status(500).json({ message: "사용자 조회 중 오류 발생" });
  }
};

//내 정보 조회
export const getMyInfo = async (req, res) => {
  try {
    const { email } = req.user; // verifyToken에서 저장된 정보
    const user = await fetchMyInfo(email);
    if (!user) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("사용자 조회 실패:", error);
    res.status(500).json({ message: "사용자 조회 중 오류 발생" });
  }
};

//위치 변경
export const changeLocation = async (req, res) => {
  const { email } = req.user; // 토큰에서 이메일
  const { location } = req.body; // 요청 본문에서 새 위치

  try {
    await changeLocationInfo(email, location);
    res.status(200).json({ message: "변경 완료", location });
  } catch (error) {
    console.error("위치 변경 에러:", error);
    res.status(500).json({ message: "서버 에러" });
  }
};

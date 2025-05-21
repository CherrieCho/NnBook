import { useQuery } from "@tanstack/react-query";
import authApi from "../../utils/authApi";

const fetchLikedBooksForBorrowed = async () => {
  const res = await authApi.get("/library/likedborrow");
  return res.data;
};

export const useLikedBooksBorrowQuery = () => {
  return useQuery({
    queryKey: ["books-liked-borrow"],
    queryFn: fetchLikedBooksForBorrowed,
    retry: false, // 토큰 오류 시 무한 재시도 방지
  });
};

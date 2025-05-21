import { useQuery } from "@tanstack/react-query";
import authApi from "../../utils/authApi";

const fetchLikedBooks = async () => {
  const res = await authApi.get("/library/liked");
  return res.data;
};

export const useLikedBooksQuery = () => {
  return useQuery({
    queryKey: ["books-liked"],
    queryFn: fetchLikedBooks,
    retry: false, // 토큰 오류 시 무한 재시도 방지
  });
};

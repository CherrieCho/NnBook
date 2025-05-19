import { useQuery } from "@tanstack/react-query";
import authApi from "../utils/authApi";

const fetchLendedBooks = async () => {
  const res = await authApi.get("/library/lended");
  return res.data;
};

export const useLendedBooksQuery = () => {
  return useQuery({
    queryKey: ["books-lended"],
    queryFn: fetchLendedBooks,
    retry: false, // 토큰 오류 시 무한 재시도 방지
  });
};

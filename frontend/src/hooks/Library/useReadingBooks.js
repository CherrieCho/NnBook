import { useQuery } from "@tanstack/react-query";
import authApi from "../../utils/authApi";

const fetchReadingBooks = async () => {
  const res = await authApi.get("/library/reading");
  return res.data;
};

export const useReadingBooksQuery = () => {
  return useQuery({
    queryKey: ["books-reading"],
    queryFn: fetchReadingBooks,
    retry: false, // 토큰 오류 시 무한 재시도 방지
  });
};

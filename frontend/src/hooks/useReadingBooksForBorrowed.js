import { useQuery } from "@tanstack/react-query";
import authApi from "../utils/authApi";

const fetchReadingBooksForBorrow = async () => {
  const res = await authApi.get("/library/readingborrow");
  return res.data;
};

export const useReadingBooksBorrowQuery = () => {
  return useQuery({
    queryKey: ["books-reading-borrow"],
    queryFn: fetchReadingBooksForBorrow,
    retry: false, // 토큰 오류 시 무한 재시도 방지
  });
};

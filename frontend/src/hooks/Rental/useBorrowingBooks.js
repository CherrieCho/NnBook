import { useQuery } from "@tanstack/react-query";
import authApi from "../../utils/authApi";

const fetchBorrowingBooks = async () => {
  const res = await authApi.get("/borrow/borrowing");
  return res.data;
};

export const useBorrowingBooksQuery = () => {
  return useQuery({
    queryKey: ["books-borrowing"],
    queryFn: fetchBorrowingBooks,
    retry: false, // 토큰 오류 시 무한 재시도 방지
  });
};

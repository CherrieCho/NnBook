import { useQuery } from "@tanstack/react-query";
import authApi from "../../utils/authApi";

const fetchFinishedBooksForBorrowed = async () => {
  const res = await authApi.get("/library/finishedborrow");
  return res.data;
};

export const useFinishedBooksBorrowQuery = () => {
  return useQuery({
    queryKey: ["books-finished-borrow"],
    queryFn: fetchFinishedBooksForBorrowed,
    retry: false, // 토큰 오류 시 무한 재시도 방지
  });
};

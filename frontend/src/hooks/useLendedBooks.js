import { useQuery } from "@tanstack/react-query";
import authApi from "../utils/authApi";

const fetchLendedBooks = async (page, pageSize) => {
  const res = await authApi.get("/library/lended", {
    params: { page, pageSize },
  });
  return res.data;
};

export const useLendedBooksQuery = (page = 1, pageSize = 10) => {
  return useQuery({
    queryKey: ["books-lended"],
    queryFn: () => fetchLendedBooks(page, pageSize),
    keepPreviousData: true,
    retry: false, // 토큰 오류 시 무한 재시도 방지
  });
};

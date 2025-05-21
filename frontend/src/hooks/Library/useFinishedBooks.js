import { useQuery } from "@tanstack/react-query";
import authApi from "../../utils/authApi";

const fetchFinishedBooks = async () => {
  const res = await authApi.get("/library/finished");
  return res.data;
};

export const useFinishedBooksQuery = () => {
  return useQuery({
    queryKey: ["books-finished"],
    queryFn: fetchFinishedBooks,
    retry: false, // 토큰 오류 시 무한 재시도 방지
  });
};

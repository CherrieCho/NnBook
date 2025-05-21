import { useQuery } from "@tanstack/react-query";
import authApi from "../../utils/authApi";

const fetchMyLendable = async () => {
  const res = await authApi.get("/borrow/mybooklendable");
  return res.data;
};

export const useMyLendableQuery = () => {
  return useQuery({
    queryKey: ["my-books-lendable"],
    queryFn: fetchMyLendable,
    retry: false, // 토큰 오류 시 무한 재시도 방지
    staleTime: 1000 * 60 * 5,
  });
};

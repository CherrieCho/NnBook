import { useQuery } from "@tanstack/react-query";
import authApi from "../../utils/authApi";

const fetchLendableBooks = async (page, pageSize) => {
  const res = await authApi.get("/borrow/lendables", {
    params: { page, pageSize },
  });
  return res.data; // 맥엔드 controller에서 설정한 response{ data, totalCount }
};

export const useLendableBooksQuery = (page, pageSize) => {
  return useQuery({
    queryKey: ["books-lendable", page],
    queryFn: () => fetchLendableBooks(page, pageSize),
    keepPreviousData: true,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
};

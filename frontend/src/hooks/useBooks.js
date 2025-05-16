import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchBookList = (page, size) => {
  return api.get("/ItemList.aspx", {
    params: {
      QueryType: "Bestseller",
      MaxResults: size,
      start: page,
      SearchTarget: "Book",
      Cover: "MidBig",
    },
  });
};

export default function useBooks(page = 1, size = 40) {
  return useQuery({
    queryKey: ["bookList", page, size],
    queryFn: () => fetchBookList(page, size),
    select: (result) =>
      Array.isArray(result?.data?.item) ? result.data.item : [],
    keepPreviousData: true,
  });
}

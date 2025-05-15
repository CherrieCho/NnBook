import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchSearchBook = async (query, categoryId, page, size = 40) => {
  const params = {
    Query: query,
    QueryType: "Keyword",
    MaxResults: size,
    start: page,
    SearchTarget: "Book",
    Cover: "MidBig",
  };

  if (categoryId) {
    params.CategoryId = categoryId;
  }

  return api.get("/ItemSearch.aspx", { params });
};

export default function useSearchBook(query, categoryId, page, size = 40) {
  return useQuery({
    queryKey: ["book-search", query, categoryId, page, size],
    queryFn: () => fetchSearchBook(query, categoryId, page, size),
    select: (result) => result.data.item,
    enabled: !!query,
    keepPreviousData: true,
  });
}

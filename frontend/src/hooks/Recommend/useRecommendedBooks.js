import { useQuery } from "@tanstack/react-query";
import api from "../../utils/api";

const fetchRecommendedBooks = (categoryId, page, size = 40) => {
  return api.get("/ItemList.aspx", {
    params: {
      CategoryId: categoryId,
      MaxResults: size,
      start: page,
      QueryType: "ItemEditorChoice",
      SearchTarget: "Book",
      Cover: "MidBig",
    },
  });
};

export default function useRecommendedBooks(categoryId, page, size = 40) {
  return useQuery({
    queryKey: ["recommendedBooks", categoryId, page, size],
    queryFn: () => fetchRecommendedBooks(categoryId, page, size),
    suspense: true,
    enabled: !!categoryId,
    select: (result) =>
      Array.isArray(result?.data?.item) ? result.data.item : [],
    keepPreviousData: true,
  });
}

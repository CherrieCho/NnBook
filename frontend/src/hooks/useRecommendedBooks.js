import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchRecommendedBooks = (categoryId) => {
  return api.get("/ItemList.aspx", {
    params: {
      CategoryId: categoryId,
      MaxResults: 10,
      QueryType: "ItemEditorChoice",
      SearchTarget: "Book",
      Cover: "MidBig",
    },
  });
};

export default function useRecommendedBooks(categoryId) {
  return useQuery({
    queryKey: ["recommendedBooks", categoryId],
    queryFn: () => fetchRecommendedBooks(categoryId),
    enabled: !!categoryId,
    select: (result) =>
      Array.isArray(result?.data?.item) ? result.data.item : [],
  });
}

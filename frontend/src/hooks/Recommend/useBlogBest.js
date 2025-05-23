import { useQuery } from "@tanstack/react-query";
import api from "../../utils/api";

const fetchBlogBest = () => {
  return api.get("/ItemList.aspx", {
    params: {
      QueryType: "BlogBest",
      SearchTarget: "Book",
      Cover: "MidBig",
    },
  });
};

export default function useBlogBest() {
  return useQuery({
    queryKey: ["blog-best"],
    queryFn: fetchBlogBest,
    suspense: true,
    select: (result) =>
      Array.isArray(result?.data?.item) ? result.data.item : [],
    keepPreviousData: true,
  });
}

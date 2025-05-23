import { useQuery } from "@tanstack/react-query";
import api from "../../utils/api";

const fetchNewSpecialBest = () => {
  return api.get("/ItemList.aspx", {
    params: {
      QueryType: "ItemNewSpecial",
      SearchTarget: "Book",
      Cover: "MidBig",
    },
  });
};

export default function useNewSpecialBest() {
  return useQuery({
    queryKey: ["new-special-best"],
    queryFn: fetchNewSpecialBest,
    suspense: true,
    select: (result) =>
      Array.isArray(result?.data?.item) ? result.data.item : [],
    keepPreviousData: true,
  });
}

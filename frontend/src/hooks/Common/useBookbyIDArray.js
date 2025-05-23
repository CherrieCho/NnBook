import { useQueries } from "@tanstack/react-query";
import api from "../../utils/api";

const fetchBookByID = (bookID) => {
  return api.get("/ItemLookUp.aspx", {
    params: {
      ItemIdType: "ItemID",
      ItemId: bookID,
      Cover: "Big",
      OptResult: "ratingInfo, packing",
    },
  });
};

export default function useBookByIDs(bookIDs) {
  const queries = useQueries({
    queries: bookIDs.map((id) => ({
      queryKey: ["bookByID", id],
      queryFn: () =>
        fetchBookByID(id).then((res) => res.data.item?.[0] || null),
      suspense: true,
      enabled: !!id,
      keepPreviousData: true,
      staleTime: 1000 * 60 * 5,
    })),
  });

  return queries;
}

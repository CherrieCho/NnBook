import { useQuery } from "@tanstack/react-query";
import authApi from "../../utils/authApi";

const fetchSingleBook = async (bookID) => {
  const res = await authApi.get("/borrow/lendablebook", {
    params: { bookID },
  });
  return res.data;
};

export const useLendableSingleBookQuery = (bookID, enabled = true) => {
  return useQuery({
    queryKey: ["lendable-single", bookID],
    queryFn: () => fetchSingleBook(bookID),
    enabled: !!bookID && enabled,
  });
};

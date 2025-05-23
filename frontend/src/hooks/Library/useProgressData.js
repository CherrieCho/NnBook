import { useQuery } from "@tanstack/react-query";
import authApi from "../../utils/authApi";

const fetchProgress = async (bookID) => {
  return authApi.get("/library/pages", {
    params: {
      bookID: bookID,
    },
  });
};

export const useProgressDataQuery = ({ bookID }) => {
  return useQuery({
    queryKey: ["progress-now"],
    queryFn: () => fetchProgress(bookID),
    select: (result) => result.data,
  });
};

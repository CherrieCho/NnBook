import { useQuery } from "@tanstack/react-query";
import authApi from "../utils/authApi";

const fetchProgress = async (bookID, holderEmail) => {
  return authApi.get("/library/pages", {
    params: {
      bookID: bookID,
      holderEmail: holderEmail,
    },
  });
};

export const useProgressDataQuery = ({ bookID, holderEmail }) => {
  return useQuery({
    queryKey: ["progress-now"],
    queryFn: () => fetchProgress(bookID, holderEmail),
    select: (result) => result.data,
  });
};

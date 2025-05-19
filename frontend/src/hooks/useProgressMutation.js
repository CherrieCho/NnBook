import { useMutation, useQueryClient } from "@tanstack/react-query";
import authApi from "../utils/authApi";

export const useProgressMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ bookID, pageNow, pageSum, progressPercent, readAt }) =>
      authApi.post("/library/pages", {
        bookID,
        pageNow,
        pageSum,
        progressPercent,
        readAt,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["myProgress"]);
    },
    onError: (err) => {
      alert(err.response?.data?.message || "진척도 기록 중 오류 발생");
    },
  });
};

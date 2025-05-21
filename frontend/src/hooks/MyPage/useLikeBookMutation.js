import { useMutation, useQueryClient } from "@tanstack/react-query";
import authApi from "../../utils/authApi";

export const useLikeBookMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ bookID }) =>
      authApi.patch("/library/liked", {
        bookID,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["myLibrary"]);
    },
    onError: (err) => {
      alert(err.response?.data?.message || "좋아요 처리 중 오류 발생");
    },
  });
};

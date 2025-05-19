import { useMutation, useQueryClient } from "@tanstack/react-query";
import authApi from "../utils/authApi";

export const useFinishBookMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ bookID }) =>
      authApi.patch("/library/finished", {
        bookID,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["myLibrary"]);
    },
    onError: (err) => {
      alert(err.response?.data?.message || "도서 상태 처리 중 오류 발생");
    },
  });
};

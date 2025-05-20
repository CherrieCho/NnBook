import { useMutation, useQueryClient } from "@tanstack/react-query";
import authApi from "../utils/authApi";

export const useReturnMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ bookID, owner }) =>
      authApi.patch("/borrow/returnbook", {
        bookID,
        owner,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["return-book"]);
      alert("정상적으로 반납되었습니다");
    },
    onError: (err) => {
      alert(err.response?.data?.message || "반납 처리 중 오류 발생");
    },
  });
};

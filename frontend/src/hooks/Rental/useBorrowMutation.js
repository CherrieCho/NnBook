import { useMutation, useQueryClient } from "@tanstack/react-query";
import authApi from "../../utils/authApi";

export const useBorrowMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ bookId, owner }) =>
      authApi.post("/borrow/borrowreq", {
        bookId,
        owner,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["myLibrary"]); // 필요 시 갱신
      alert("대여가 완료되었습니다");
    },
    onError: (err) => {
      alert(err.response?.data?.message || "대여 중 오류 발생");
    },
  });
};

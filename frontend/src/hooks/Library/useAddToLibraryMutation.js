import { useMutation, useQueryClient } from "@tanstack/react-query";
import authApi from "../../utils/authApi";

export const useAddToLibraryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ bookID, email }) =>
      authApi.post("/library/reading", {
        bookID,
        ownerEmail: email,
        holderEmail: email,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["myLibrary"]); // 필요 시 갱신
      alert("내 서재에 추가되었습니다!");
    },
    onError: (err) => {
      alert(err.response?.data?.message || "추가 중 오류 발생");
    },
  });
};

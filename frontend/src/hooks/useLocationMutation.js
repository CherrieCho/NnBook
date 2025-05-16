import { useMutation, useQueryClient } from "@tanstack/react-query";
import authApi from "../utils/authApi";

export const useLocationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ location, city }) =>
      authApi.patch("/auth/location", { location, city }),
    onSuccess: () => {
      queryClient.invalidateQueries(["myInfo"]); // 내 정보 다시 불러오기
    },
    onError: (err) => {
      alert(err.response?.data?.message || "변경 중 오류 발생");
    },
  });
};

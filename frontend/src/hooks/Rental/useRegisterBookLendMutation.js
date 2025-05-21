import { useMutation, useQueryClient } from "@tanstack/react-query";
import authApi from "../../utils/authApi";

const registerBookLend = async ({
  bookID,
  email,
  location,
  latitude,
  longitude,
}) => {
  const res = await authApi.post(`/borrow/booklend`, {
    bookID,
    email,
    location,
    latitude,
    longitude,
  });
  return res.data;
};

export function useRegisterBookLendMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerBookLend,
    onSuccess: () => {
      queryClient.invalidateQueries(["books-register"]);
      alert("대여 등록이 완료되었습니다.");
    },
    onError: (err) => {
      alert(err.response?.data?.message || "대여 등록 중 오류 발생");
    },
  });
}

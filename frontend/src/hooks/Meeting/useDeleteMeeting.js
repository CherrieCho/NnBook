import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosMeetingDB from "../../utils/axiosMeetingDB";

const deleteMeeting = async (id) => {
  const res = await axiosMeetingDB.delete(`/${id}`);
  return res.data;
};

export const useDeleteMeeting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMeeting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meetings"], exact: false });
    },
    onError: (err) => {
      alert(err.response?.data?.message || "모임 삭제 실패");
    },
  });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosMeetingDB from "../utils/axiosMeetingDB";
import { useNavigate } from "react-router";

export const useLeaveMeeting = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ leaderEmail, memberEmail }) => {
      const res = await axiosMeetingDB.delete("/leave", {
        data: { leaderEmail, memberEmail },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["members"]);
      alert("정상적으로 탈퇴되었습니다");
      navigate("/meeting");
    },
    onError: (err) => {
      alert(err.response?.data?.message || "탈퇴 처리 중 오류 발생");
    },
  });
};

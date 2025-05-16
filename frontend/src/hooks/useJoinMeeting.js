import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosMeetingDB from "../utils/axiosMeetingDB";
import { useNavigate } from "react-router-dom";

export const useJoinMeeting = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ leaderEmail, memberEmail }) =>
      axiosMeetingDB.post("/join", {
        leaderEmail,
        memberEmail,
      }),
    onSuccess: () => {
      alert("가입 성공");
      queryClient.invalidateQueries(["members"]);
      navigate("/meeting");
    },
    onError: (err) => {
      alert(err.response?.data?.message || "가입 처리 중 오류 발생");
    },
  });
};

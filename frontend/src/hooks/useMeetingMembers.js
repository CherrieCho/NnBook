import { useQuery } from "@tanstack/react-query";
import axiosMeetingDB from "../utils/axiosMeetingDB";

const fetchMembers = async (leader) => {
  const res = await axiosMeetingDB.get("/members", {
    params: { leaderEmail: leader },
  });
  return res.data;
};

export const useMeetingMemberQuery = (leader, enabled = true) => {
  return useQuery({
    queryKey: ["members", leader],
    queryFn: () => fetchMembers(leader),
    enabled, // leader가 존재할 때만 실행
  });
};

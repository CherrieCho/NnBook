import { useQuery } from "@tanstack/react-query";
import axiosMeetingDB from "../../utils/axiosMeetingDB";

const fetchMeeting = async (page, pageSize) => {
  const res = await axiosMeetingDB.get("/view", {
    params: { page, pageSize },
  });
  return res.data;
};

export const useMeetingQuery = (page = 1, pageSize = 3) => {
  return useQuery({
    queryKey: ["meetings", page],
    queryFn: () => fetchMeeting(page, pageSize),
    suspense: true,
    keepPreviousData: true,
  });
};

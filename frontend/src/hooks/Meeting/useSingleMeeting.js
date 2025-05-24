import { useQuery } from "@tanstack/react-query";
import axiosMeetingDB from "../../utils/axiosMeetingDB";

const fetchSingleMeeting = async (id) => {
  const res = await axiosMeetingDB.get(`/view/${id}`);
  return res.data;
};

export const useSingleMeetingQuery = (id, enabled = true) => {
  return useQuery({
    queryKey: ["meeting-single", id],
    queryFn: () => fetchSingleMeeting(id),
    enabled: !!id && enabled,
  });
};

import { useMutation } from "@tanstack/react-query";
import axiosMeetingDB from "../../utils/axiosMeetingDB";

const postMeeting = async (meetingData) => {
  const res = await axiosMeetingDB.post("/create", meetingData);
  return res.data;
};

export const useCreateMeeting = () => {
  return useMutation({
    mutationFn: (meetingData) => postMeeting(meetingData),
  });
};

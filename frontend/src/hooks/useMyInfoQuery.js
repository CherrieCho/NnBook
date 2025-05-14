import { useQuery } from "@tanstack/react-query";
import authApi from "../utils/authApi";

const fetchMyInfo = async () => {
  const res = await authApi.get("/auth/me");
  return res.data;
};

export const useMyInfoQuery = () => {
  return useQuery({
    queryKey: ["myInfo"],
    queryFn: fetchMyInfo,
    retry: false, // 토큰 오류 시 무한 재시도 방지
  });
};

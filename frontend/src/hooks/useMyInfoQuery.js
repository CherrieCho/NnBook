import { useQuery } from "@tanstack/react-query";
import authApi from "../utils/authApi";

const fetchMyInfo = async () => {
  const res = await authApi.get("/auth/me");
  return res.data;
};

export const useMyInfoQuery = () => {
  const token = localStorage.getItem("token");

  return useQuery({
    queryKey: ["myInfo"],
    queryFn: fetchMyInfo,
    enabled: !!token, // 토큰이 있을 때만 API 요청
    retry: false, // 토큰 오류 시 무한 재시도 방지
  });
};

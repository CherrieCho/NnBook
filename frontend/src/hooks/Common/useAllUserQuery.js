import { useQuery } from "@tanstack/react-query";
import authApi from "../../utils/authApi";

const fetchAllUsers = async () => {
  const response = await authApi.get("/auth/getusers");
  return response.data;
};

export const useAllUsersQuery = () => {
  return useQuery({
    queryKey: ["allUsers"],
    queryFn: fetchAllUsers,
    suspense: true,
    retry: 3,
  });
};

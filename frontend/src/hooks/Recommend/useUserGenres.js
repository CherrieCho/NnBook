import { useQuery } from "@tanstack/react-query";
import authApi from "../../utils/authApi";

const fetchUserGenres = async (email) => {
  const res = await authApi.get(`/mypage/favgenre?email=${email}`);
  return res.data;
};

const useUserGenres = (email) => {
  return useQuery({
    queryKey: ["userGenres", email],
    queryFn: () => fetchUserGenres(email),
    suspense: true,
    enabled: !!email,
  });
};

export default useUserGenres;

import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchBookByID = async (bookID) => {
  const res = await api.get("/ItemLookUp.aspx", {
    params: {
      ItemIdType: "ItemID",
      ItemId: bookID,
      Cover: "Big",
      OptResult: "ratingInfo, packing",
    },
  });

  //데이터 없으면 throw error
  const item = res?.data?.item;
  if (!Array.isArray(item) || item.length === 0) {
    throw new Error(`일시적 응답 실패: bookID=${bookID}`);
  }

  return item[0]; // 정상 데이터 반환
};

export default function useBookByID(bookID) {
  return useQuery({
    queryKey: ["bookByID", bookID],
    queryFn: () => fetchBookByID(bookID),
    enabled: !!bookID,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
    retry: 5,
    retryDelay: 1000,
  });
}

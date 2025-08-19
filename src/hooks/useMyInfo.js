import { useQuery } from "@tanstack/react-query";
import { getMyInfo } from "@/apis/userService";

export function useMyInfo() {
  return useQuery({
    queryKey: ["myInfo"],
    queryFn: getMyInfo,
    staleTime: 60 * 1000,
    retry: 1,
  });
}

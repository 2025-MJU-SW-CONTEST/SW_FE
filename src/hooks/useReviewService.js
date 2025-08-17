import {useQuery} from "@tanstack/react-query";
import {reviewService} from "@apis/reviewService.js";
export const useReviewYear = (year, month) => {
  return useQuery({
    queryFn: () => reviewService.getMonthReview({year,month}),
    queryKey: ['review', year, month],
  });
}
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {reviewService} from "@apis/reviewService.js";
export const useReviewYear = (year, month) => {
  return useQuery({
    queryFn: () => reviewService.getMonthReview({year,month}),
    queryKey: ['review', year, month],
  });
}

export const useReviewDate = (date) => {
  return useQuery({
    queryFn: () => reviewService.getDateReview({date}),
    queryKey: ['review', date],
  })
}

export const useDeleteReview = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => reviewService.deleteReview({id}),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['review'],
        exact: true,
      })
    },
    onError: (error) => {
      console.log(error);
    }
  })
}
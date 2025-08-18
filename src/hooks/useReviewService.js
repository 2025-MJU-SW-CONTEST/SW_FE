import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {reviewService} from "@apis/reviewService.js";
import {useToast} from "@store/useToast.js";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {pagePath} from "@routes/pagePath.js";
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

export const useCreateReview = () => {
  const navigate = useNavigate();
  const {t} = useTranslation(['popup']);
  const {showToast} = useToast();

  return useMutation({
    mutationFn: ({title, content, date}) => reviewService.postCreateReview({title, content, date}),
    onSuccess: () => {
      showToast(`${t("popup_complete_article")}`)
      navigate("/"+pagePath.ARTICLE);
    },
    onError: (error) => {
      showToast(error.message)
    }
  })
}

export const usePutReview = (id, title, content) => {
  const navigate = useNavigate();
  const {t} = useTranslation(['popup']);
  const {showToast} = useToast();

  return useMutation({
    mutationFn: () => reviewService.putReview({id, title, content}),
    onSuccess: () => {
      showToast(`${t("popup_edit_article")}`)
      navigate("/"+pagePath.ARTICLE);
    },
    onError: (error) => {
      showToast(error.message)
    }
  })
}

export const useDeleteReview = (id) => {
  const queryClient = useQueryClient();
  const {showToast} = useToast();
  return useMutation({
    mutationFn: () => reviewService.deleteReview({id}),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['review'],
        exact: true,
      })
    },
    onError: (error) => {
      showToast(error.message)
    }
  })
}
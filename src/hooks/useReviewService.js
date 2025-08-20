import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { reviewService } from "@apis/reviewService.js";
import { useToast } from "@store/useToast.js";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { pagePath } from "@routes/pagePath.js";
import { t } from "i18next";
export const useReviewYear = (year, month) => {
  const enabled =
    Number.isFinite(year) &&
    Number.isFinite(month) &&
    month >= 1 &&
    month <= 12;

  return useQuery({
    queryFn: () => reviewService.getMonthReview({ year, month }),
    queryKey: ["review:month", year, month],
    enabled,
    keepPreviousData: false,
    staleTime: 0,
  });
};

export const useReviewDate = (date) => {
  const enabled = !!date;
  return useQuery({
    queryFn: () => reviewService.getDateReview({ date }),
    queryKey: ["review:date", date],
    enabled,
    keepPreviousData: false,
    placeholderData: [],
    staleTime: 0,
  });
};

export const useCreateReview = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(["popup"]);
  const { showToast } = useToast();

  return useMutation({
    mutationFn: ({ title, content, date }) =>
      reviewService.postCreateReview({ title, content, date }),
    onSuccess: (_res, vars) => {
      showToast(`${t("popup_complete_article")}`);
      navigate("/" + pagePath.ARTICLE);
    },
    onError: (error) => {
      showToast(error.message);
    },
  });
};

export const usePutReview = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(["popup"]);
  const { showToast } = useToast();

  return useMutation({
    mutationFn: ({ id, title, content }) =>
      reviewService.putReview({ id, title, content }),
    onSuccess: () => {
      showToast(`${t("popup_edit_article")}`);
      navigate("/" + pagePath.ARTICLE);
    },
    onError: (error) => {
      showToast(error.message);
    },
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation(["popup"]);
  const { showToast } = useToast();
  return useMutation({
    mutationFn: ({ id }) => reviewService.deleteReview({ id }),
    onSuccess: () => {
      showToast(`${t("popup_delete_article")}`);
      queryClient.invalidateQueries({
        queryKey: ["review"],
        exact: true,
      });
    },
    onError: (error) => {
      showToast(error.message);
    },
  });
};

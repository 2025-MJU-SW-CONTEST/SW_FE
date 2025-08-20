import BackHeader from "@components/common/BackHeader.jsx";
import TextField from "@components/common/TextField.jsx";
import Button from "@components/common/Button.jsx";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useCreateReview, usePutReview } from "@hooks/useReviewService.js";
import useArticle from "@store/useArticle.js";

const ArticleEdit = () => {
  const [active, setActive] = useState(false);

  const [value, setValue] = useState({
    title: "",
    content: "",
  });

  const { t } = useTranslation(["backHeader", "title", "button"]);
  const { mutateAsync: createArticle, isPending } = useCreateReview();
  const { mutateAsync: postArticle } = usePutReview();
  const navigate = useNavigate();

  const isActive = value.title && value.content;

  const selectedDay = useArticle((state) => state.selectedDay);
  const articles = useArticle((state) => state.articles);

  const handleOnComplete = async () => {
    if (isPending) return null;
    if (selectedDay) await createArticle({ ...value, date: selectedDay });
    else await postArticle({ ...value, id: articles.id });
  };

  useEffect(() => {
    if (selectedDay) {
      setValue({ title: "", content: "" });
    } else if (articles) {
      setValue({
        title: articles.title || "",
        content: articles.content || "",
      });
    } else {
      setValue({ title: "", content: "" });
    }
  }, [selectedDay, articles]);

  return (
    <div className="h-screen flex flex-col">
      <BackHeader
        onBack={() => navigate(-1)}
        label={
          selectedDay
            ? t("backHeader:backHeader_writeReview")
            : t("backHeader:backHeader_editReview")
        }
      />
      <div className="flex-1 overflow-auto px-5 mt-[23px]">
        <p className="pl-3 font-family-pretendard text-016 font-bold text-font-800 leading-normal tracking-wide">
          {t("title:title_movie_name")}
        </p>
        <TextField
          value={value.title}
          setValue={(val) => setValue((prev) => ({ ...prev, title: val }))}
          setIsActive={setActive}
          type={"expand"}
          className="pretendard_regular mt-[12px]"
        />
        <p className="pl-3 font-family-pretendard text-016 font-bold text-font-800 leading-normal tracking-wide mt-[37px]">
          {t("title:title_movie_article")}
        </p>
        <textarea
          value={value.content}
          onChange={(event) =>
            setValue((prev) => ({ ...prev, content: event.target.value }))
          }
          className="w-full border-b border-primary outline-none pretendard_regular min-h-[348px] resize-none p-4 mt-[12px]"
        />
      </div>

      {/* 버튼 영역 */}
      <div className="px-[49px] py-[37px]">
        <Button
          type="emphasis"
          onClick={handleOnComplete}
          isActive={isActive}
          text={t("button:button_complete")}
        />
      </div>
    </div>
  );
};

export default ArticleEdit;

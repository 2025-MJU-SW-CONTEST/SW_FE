import BottomNavigation from "@components/common/BottomNavigation.jsx";
import CustomCalendar from "@components/article/CustomCalendar.jsx";
import Blank from "@components/article/Blank.jsx";
import Divider from "@components/article/Divider.jsx";
import AddButton from "@components/common/AddButton.jsx";
import Content from "@components/article/Content.jsx";
import ScrollArea from "@components/common/ScrollArea.jsx";

import { pagePath } from "@routes/pagePath.js";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDeleteReview, useReviewYear } from "@hooks/useReviewService.js";
import { useReviewDate } from "@hooks/useReviewService.js";

import useArticle from "@store/useArticle.js";
import dayjs from "dayjs";

const Article = () => {
  const [selectDay, setSelectDay] = useState(null);
  const [month, setMonth] = useState(new Date());

  const year = parseInt(dayjs(month).format("YYYY"), 10); // 2025 -> 숫자
  const monthNum = parseInt(dayjs(month).format("M"), 10);
  const selectedDay = selectDay
    ? dayjs(selectDay).format("YYYY-MM-DD")
    : undefined;

  const setArticles = useArticle((state) => state.setArticles);
  const setSelectedDay = useArticle((state) => state.setSelectedDay);

  const { data: monthInfo, refetch: refecthMonth } = useReviewYear(
    year,
    monthNum
  );
  const { data: dateInfo, refetch: refecthDate } = useReviewDate(selectedDay);
  const { mutateAsync, isPending } = useDeleteReview();

  const modifiers = monthInfo?.map((dateStr) => new Date(dateStr));
  const navigate = useNavigate();

  const handleChangeMonth = (newMonth) => {
    setMonth(newMonth);
    setSelectDay(null);
    setSelectedDay("");
    setArticles(null);
  };

  const handleEdit = (idx) => {
    setSelectedDay("");
    setArticles(dateInfo[idx]);
    navigate("/" + pagePath.ARTICLEEDIT);
  };

  const handleAdd = () => {
    if (!selectedDay) {
      return;
    }
    setArticles(null);
    setSelectedDay(selectedDay);
    navigate("/" + pagePath.ARTICLECREATE);
  };

  useEffect(() => {
    if (selectedDay) refecthDate();
  }, [selectedDay]);

  useEffect(() => {
    refecthMonth();
  }, [year, monthNum]);

  const handleDelete = async (id) => {
    if (isPending) return;
    await mutateAsync({ id });
    await Promise.all([refecthDate(), refecthMonth()]);
  };

  return (
    <div>
      <ScrollArea className="pb-[81px]">
        <div className="mt-[21px]">
          <CustomCalendar
            modifiers={modifiers}
            selectedDay={selectDay}
            setSelectedDay={(day) => {
              setSelectDay(day);
            }}
            setMonthProps={handleChangeMonth}
          />
          <Divider className="mt-[33px]" />
          {dateInfo?.length > 0 ? (
            <div className="px-016 mt-[17px] flex flex-col gap-5">
              {dateInfo?.map((item, idx) => (
                <Content
                  key={idx}
                  onClickDelete={() => handleDelete(item?.id)}
                  onClickEdit={() => handleEdit(idx)}
                  title={item?.title}
                  description={item?.content}
                />
              ))}
            </div>
          ) : (
            <Blank type={selectDay ? "article" : "date"} />
          )}
        </div>
        <AddButton className="bottom-[85px]" onClick={handleAdd} />
      </ScrollArea>
      <BottomNavigation />
    </div>
  );
};

export default Article;

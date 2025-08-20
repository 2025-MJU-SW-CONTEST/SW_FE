import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import {
  getMovieAnalyses,
  mapAnalysis,
  deleteAnalysis,
} from "@/apis/analysisService";
import InfiniteScroll from "react-infinite-scroll-component";
import formatNewlines from "@/utils/formatText";
import InterpretationCard from "../interpretation.jsx/InterpretationCard";
import XIcon from "@/assets/icon/Home/XIcon";
import AddButton from "../common/AddButton";

const MovieInterpretationTab = ({ movieId, currentUserId, pageSize = 10 }) => {
  const navigate = useNavigate();
  const { t } = useTranslation(["description"]);

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const mapList = (arr = []) => arr.filter(Boolean).map(mapAnalysis);

  // 최초 로딩
  useEffect(() => {
    let alive = true;
    (async () => {
      setIsFetching(true);
      try {
        const data = await getMovieAnalyses({
          movieId,
          page: 0,
          size: pageSize,
        });
        if (!alive) return;
        const mapped = mapList(data?.content);
        setItems(mapped);
        setTotalCount(Number(data?.totalElements ?? mapped.length));

        const totalPages = Number.isFinite(data?.totalPages)
          ? data.totalPages
          : 0;
        const isLast =
          typeof data?.last === "boolean"
            ? data.last
            : totalPages
            ? 0 >= totalPages - 1
            : mapped.length < pageSize;
        setHasMore(!isLast);
        setPage(0);
      } catch (e) {
        console.error("[analysis:list:error]", e);
      } finally {
        if (alive) setIsFetching(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [movieId, pageSize]);

  const fetchMore = async () => {
    if (!hasMore || isFetching) return;
    setIsFetching(true);
    try {
      const next = page + 1;
      const data = await getMovieAnalyses({
        movieId,
        page: next,
        size: pageSize,
      });
      const mapped = mapList(data?.content);

      setItems((prev) => {
        const seen = new Set(prev.map((it) => String(it.id)));
        const uniq = mapped.filter((it) => !seen.has(String(it.id)));
        return [...prev, ...uniq];
      });

      if (Number.isFinite(Number(data?.totalElements))) {
        setTotalCount(Number(data.totalElements));
      }

      const totalPages = Number.isFinite(data?.totalPages)
        ? data.totalPages
        : 0;
      const isLast =
        typeof data?.last === "boolean"
          ? data.last
          : totalPages
          ? next >= totalPages - 1
          : mapped.length < pageSize;
      setHasMore(!isLast);
      setPage(next);
    } catch (e) {
      console.error("[analysis:list:more:error]", e);
    } finally {
      setIsFetching(false);
    }
  };

  const handleAddInterpretation = () => {
    navigate(`/movies/${movieId}/interpretation/new`);
  };

  const { mutateAsync: removeAsync, isPending: isDeleting } = useMutation({
    mutationFn: (id) => deleteAnalysis(id),
  });

  const handleDelete = async (id) => {
    try {
      await removeAsync(id);
      setItems((prev) => prev.filter((it) => String(it.id) !== String(id)));
      setTotalCount((c) => Math.max(0, c - 1));
      navigate(`/movies/${movieId}`, {
        replace: true,
        state: { openTab: "interpretation", showDeleteToast: true },
      });
    } catch (e) {
      console.error(
        "[analysis:delete:error]",
        e?.response?.status,
        e?.response?.data || e
      );
      alert("삭제에 실패했어요. 잠시 후 다시 시도해 주세요.");
    }
  };

  // 내 해석 최상단 정렬
  const [mine, others] = useMemo(() => {
    const mineArr = [];
    const otherArr = [];
    items.forEach((it) => {
      (it.author?.id === currentUserId ? mineArr : otherArr).push(it);
    });
    return [mineArr, otherArr];
  }, [items, currentUserId]);

  if (!items.length && !isFetching) {
    return (
      <>
        <div className="relative flex flex-col items-center mt-20 px-[23px] ">
          <XIcon className="w-16 h-16 mb-[13px]" />
          <p className="pretendard_regular text-center">
            {formatNewlines(t("description:description_no_interpretation"))}
          </p>
          <AddButton onClick={handleAddInterpretation} />
        </div>
      </>
    );
  }

  return (
    <div className="relative flex flex-col items-center">
      {/* 해석 총 개수 */}
      <p className="w-full pl-[38px] pretendard_regular leading-6 text-font-500 pt-6.5 pb-0.5">
        {t("description:description_interpretation_count", {
          count: totalCount,
        })}
      </p>

      <div id="interpretationList" className="w-full">
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMore}
          hasMore={hasMore}
          loader={
            <div className="pretendard_regular text-014 text-center h-full text-font-500 mt-8">
              로딩중...
            </div>
          }
          scrollableTarget="detailScrollable"
        >
          <div className="flex flex-col items-center gap-4">
            {mine.map((item) => (
              <InterpretationCard
                key={`mine-${item.id}`}
                data={item}
                isMine={true}
                movieId={movieId}
                onDelete={handleDelete}
              />
            ))}
            {others.map((item) => (
              <InterpretationCard
                key={`other-${item.id}`}
                data={item}
                isMine={false}
                movieId={movieId}
              />
            ))}
          </div>
        </InfiniteScroll>
      </div>
      <AddButton onClick={handleAddInterpretation} />
    </div>
  );
};

export default MovieInterpretationTab;

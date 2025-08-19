import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  getMyAnalyses,
  mapAnalysis,
  deleteAnalysis,
} from "@/apis/analysisService";
import InfiniteScroll from "react-infinite-scroll-component";
import BackHeader from "@/components/common/BackHeader";
import InterpretationCard from "@/components/interpretation.jsx/InterpretationCard";
import ToastMessage from "@/components/common/ToastMessage";

const PAGE_SIZE = 10;

const MyInterpretations = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation(["backheader", "description", "popup"]);

  const [allItems, setAllItems] = useState([]);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [toastMessage, setToastMessage] = useState("");
  const toastTimerRef = useRef(null);

  const isMine = true;

  useEffect(() => {
    let alive = true;
    (async () => {
      setIsLoading(true);
      try {
        const data = await getMyAnalyses();
        if (!alive) return;

        // 최신순 정렬
        const mapped = (data || []).map(mapAnalysis).sort((a, b) => {
          const ta = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const tb = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return tb - ta;
        });

        setAllItems(mapped);
        const first = mapped.slice(0, PAGE_SIZE);
        setItems(first);
        setHasMore(mapped.length > first.length);
      } catch (e) {
        console.error("[my-analyses:load:error]", e);
      } finally {
        if (alive) setIsLoading(false);
      }
    })();
    return () => {
      alive = false;
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
        toastTimerRef.current = null;
      }
    };
  }, []);

  const fetchMoreData = () => {
    if (isLoading || !hasMore) return;
    const nextChunk = allItems.slice(items.length, items.length + PAGE_SIZE);
    const merged = items.concat(nextChunk);
    setItems(merged);
    setHasMore(merged.length < allItems.length);
  };

  useEffect(() => {
    const state = location.state;
    if (!state) return;

    // 1) 수정 패치
    if (state.updatedInterpretation) {
      const { id, content } = state.updatedInterpretation;

      setAllItems((prev) =>
        prev.map((it) =>
          String(it.id) === String(id) ? { ...it, content } : it
        )
      );
      setItems((prev) =>
        prev.map((it) =>
          String(it.id) === String(id) ? { ...it, content } : it
        )
      );
    }

    // 2) 토스트
    if (state.showUpdateToast) {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      setToastMessage(t("popup:popup_toast_03"));
      toastTimerRef.current = setTimeout(() => {
        setToastMessage("");
        toastTimerRef.current = null;
      }, 2000);
    }

    navigate(location.pathname, { replace: true, state: null });
  }, [location.key, t, navigate]);

  // 삭제
  const handleDelete = async (id) => {
    try {
      await deleteAnalysis(id);

      // 1) 전체 목록에서 제거
      const newAll = allItems.filter((it) => String(it.id) !== String(id));
      setAllItems(newAll);

      // 2) 화면 조각에서도 제거 + 부족분 채워 넣기
      let newShown = items.filter((it) => String(it.id) !== String(id));
      const need = PAGE_SIZE - newShown.length;
      if (need > 0) {
        const shownIds = new Set(newShown.map((it) => String(it.id)));
        const candidates = newAll.filter((it) => !shownIds.has(String(it.id)));
        newShown = newShown.concat(candidates.slice(0, need));
      }
      setItems(newShown);
      setHasMore(newShown.length < newAll.length);

      // 3) 토스트
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      setToastMessage(t("popup:popup_toast_02"));
      toastTimerRef.current = setTimeout(() => {
        setToastMessage("");
        toastTimerRef.current = null;
      }, 2000);
    } catch (e) {
      console.error(
        "[my-analyses:delete:error]",
        e?.response?.status,
        e?.response?.data || e
      );
      alert(
        t(
          "description:description_delete_fail",
          "삭제에 실패했어요. 잠시 후 다시 시도해 주세요."
        )
      );
    }
  };

  const isEmpty = !isLoading && allItems.length === 0;

  return (
    <div className="flex flex-col h-screen">
      <BackHeader
        label={t("backHeader:backHeader_myInterpretations")}
        onBack={() => navigate(-1)}
      />
      {isLoading ? (
        <div className="pretendard_regular text-center text-font-400 mt-8">
          로딩중...
        </div>
      ) : isEmpty ? (
        <p className="pretendard_regular text-center text-font-400 mt-8">
          {t("description:description_no_my_interpretation")}
        </p>
      ) : (
        <div id="scrollableDiv" className="flex-1 overflow-y-auto">
          <InfiniteScroll
            dataLength={items.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={
              <div className="pretendard_regular text-center mb-1">
                로딩중...
              </div>
            }
            scrollableTarget="scrollableDiv"
          >
            <div className="flex flex-col py-[25px] px-4 gap-[25px]">
              {items.map((item) => (
                <InterpretationCard
                  key={item.id}
                  data={item}
                  isMine={isMine}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </InfiniteScroll>
        </div>
      )}
      {toastMessage && <ToastMessage message={toastMessage} />}
    </div>
  );
};

export default MyInterpretations;

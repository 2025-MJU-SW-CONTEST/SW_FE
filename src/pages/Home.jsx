import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import formatNewlines from "@/utils/formatText";
import InfiniteScroll from "react-infinite-scroll-component";
import MovieSearch from "@/components/home/MovieSearch";
import MovieCard from "@/components/home/MovieCard";
import XIcon from "@/assets/icon/Home/XIcon";
import BottomNavigation from "@components/common/BottomNavigation.jsx";
import { getMoviePage } from "@/apis/movieService";
import { getMovieSearchPage } from "@/apis/movieService";
import { toImageUrl } from "@/utils/images";

const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(["title", "description"]);

  // 공통
  const pageSize = 10;
  const mapServerItem = (it) => ({
    id: it.id,
    title: it.title,
    thumbnailUrl: it.thumbnailUrl,
    rating: it.rating,
  });

  // 목록(홈) 상태
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const listLoadingRef = useRef(false);

  // 검색 상태(서버 페이징)
  const [isSearching, setIsSearching] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchItems, setSearchItems] = useState([]);
  const [searchPage, setSearchPage] = useState(0);
  const [hasMoreSearch, setHasMoreSearch] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [searchTotal, setSearchTotal] = useState(0);
  const searchLoadingRef = useRef(false);

  // 스크롤 컨테이너/스냅샷
  const scrollRef = useRef(null);
  const keepPosRef = useRef(null);

  const snapshotScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    keepPosRef.current = el.scrollTop;
  };

  // 목록 페이지 로드
  async function loadListPage(nextPage) {
    if (listLoadingRef.current) return;
    listLoadingRef.current = true;
    setIsLoading(true);
    try {
      const data = await getMoviePage({ page: nextPage, size: pageSize });
      const mapped = (data?.content || []).map(mapServerItem);

      setItems((prev) => {
        if (nextPage === 0) return mapped;
        const seen = new Set(prev.map((m) => m.id));
        const uniq = mapped.filter((m) => !seen.has(m.id));
        return [...prev, ...uniq];
      });

      const totalPages = Number.isFinite(data?.totalPages)
        ? data.totalPages
        : null;
      const isLast =
        typeof data?.last === "boolean"
          ? data.last
          : totalPages !== null
          ? nextPage >= totalPages - 1
          : mapped.length < pageSize;

      setHasMore(!isLast);
      setPage(nextPage);
    } catch (e) {
      console.error("영화 목록 로딩 실패:", e);
    } finally {
      setIsLoading(false);
      listLoadingRef.current = false;
    }
  }

  // 최초 1페이지
  useEffect(() => {
    loadListPage(0);
  }, []);

  // 무한스크롤: 목록
  const fetchMoreData = () => {
    if (isSearching) return;
    if (!hasMore || isLoading) return;
    loadListPage(page + 1);
    snapshotScroll();
  };

  // 검색 시작/변경
  const handleSearch = async (rawKeyword) => {
    const keyword = rawKeyword.trim();
    if (!keyword) {
      // 검색 종료 → 목록 모드로 복귀
      setIsSearching(false);
      setSearchKeyword("");
      setSearchItems([]);
      setSearchPage(0);
      setHasMoreSearch(false);
      setSearchTotal(0);
      // 스크롤을 맨 위로
      const sc = document.getElementById("scrollableDiv");
      sc?.scrollTo({ top: 0, behavior: "instant" });
      return;
    }

    // 검색 모드로 전환
    setIsSearching(true);
    setSearchKeyword(keyword);
    setSearchItems([]);
    setSearchPage(0);
    setHasMoreSearch(false);
    setSearchTotal(0);
    setIsSearchLoading(true);
    try {
      const data = await getMovieSearchPage({
        keyword,
        page: 0,
        size: pageSize,
      });
      const mapped = (data?.content || []).map(mapServerItem);

      setSearchItems(mapped);
      setSearchTotal(Number(data?.totalElements ?? mapped.length));
      const totalPages = Number.isFinite(data?.totalPages)
        ? data.totalPages
        : 0;
      setHasMoreSearch(0 < totalPages - 1 && mapped.length > 0);
      setSearchPage(0);

      // 스크롤을 검색 목록 상단으로
      const sc = document.getElementById("scrollableDiv");
      sc?.scrollTo({ top: 0, behavior: "instant" });
    } catch (e) {
      console.error("영화 검색 실패:", e);
    } finally {
      setIsSearchLoading(false);
    }
  };

  // 무한스크롤: 검색 결과 다음 페이지
  const fetchMoreSearchData = async () => {
    if (!isSearching) return;
    if (!hasMoreSearch || isSearchLoading) return;
    if (searchLoadingRef.current) return;

    snapshotScroll();
    searchLoadingRef.current = true;
    setIsSearchLoading(true);
    try {
      const nextPage = searchPage + 1;
      const data = await getMovieSearchPage({
        keyword: searchKeyword,
        page: nextPage,
        size: pageSize,
      });
      const mapped = (data?.content || []).map(mapServerItem);

      setSearchItems((prev) => {
        const seen = new Set(prev.map((m) => m.id));
        const uniq = mapped.filter((m) => !seen.has(m.id));
        return [...prev, ...uniq];
      });

      const totalPages = Number.isFinite(data?.totalPages)
        ? data.totalPages
        : 0;
      setHasMoreSearch(nextPage < totalPages - 1 && mapped.length > 0);
      setSearchPage(nextPage);
      setSearchTotal(Number(data?.totalElements ?? 0));
    } catch (e) {
      console.error("영화 검색 다음 페이지 로딩 실패:", e);
    } finally {
      setIsSearchLoading(false);
      searchLoadingRef.current = false;
    }
  };

  // 리스트 길이 변화 후 스크롤 복원
  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (keepPosRef.current != null) {
      el.scrollTop = keepPosRef.current;
      keepPosRef.current = null;
    }
  }, [items.length, searchItems.length, isSearching]);

  // 상세 이동
  const goDetail = (movieId) => {
    navigate(`/movies/${movieId}`);
  };

  return (
    <>
      <div className="flex flex-col h-screen items-center">
        <MovieSearch onSearch={handleSearch} />
        <div className="w-full ml-9 mt-[27px] mb-4 pretendard_bold text-018">
          {isSearching ? (
            <div className="pretendard_regular text-font-500 mb-2.5">
              {t("description:description_search_count", {
                count: searchTotal || searchItems.length,
              })}
            </div>
          ) : (
            `${t("title:title_home_movie")}`
          )}
        </div>
        <div
          id="scrollableDiv"
          ref={scrollRef}
          className="flex-1 overflow-y-auto pb-20"
        >
          {isSearching ? (
            <InfiniteScroll
              dataLength={searchItems.length}
              next={fetchMoreSearchData}
              hasMore={hasMoreSearch}
              loader={
                <div className="pretendard_regular text-center mt-2 mb-1">
                  로딩중...
                </div>
              }
              scrollableTarget="scrollableDiv"
            >
              {/* 결과 없음 메시지: 로딩이 아닐 때만 */}
              {!isSearchLoading && searchItems.length === 0 ? (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="flex flex-col items-center">
                    <XIcon />
                    <p className="pretendard_regular mt-[13px]">
                      {formatNewlines(
                        t("description:description_no_search_results")
                      )}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap justify-center gap-6 w-full">
                  {searchItems.map((movie, idx) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      onClick={() => goDetail(movie.id)}
                      eager={searchPage === 0 && idx < 10}
                    />
                  ))}
                </div>
              )}
              {isSearchLoading && searchItems.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center h-full">
                  <div className="pretendard_regular flex items-center">
                    로딩중...
                  </div>
                </div>
              )}
            </InfiniteScroll>
          ) : (
            <>
              {items.length === 0 && isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="pretendard_regular text-center">
                    로딩중...
                  </div>
                </div>
              ) : (
                <InfiniteScroll
                  dataLength={items.length}
                  next={fetchMoreData}
                  hasMore={hasMore}
                  loader={
                    <div className="pretendard_regular text-center mb-1">
                      로딩중...
                    </div>
                  }
                  endMessage={
                    <div className="pretendard_regular text-center mt-2 mb-1 text-font-500">
                      마지막 콘텐츠입니다.
                    </div>
                  }
                  scrollableTarget="scrollableDiv"
                >
                  <div className="flex flex-wrap justify-center gap-6 w-full">
                    {items.map((movie, idx) => (
                      <MovieCard
                        key={movie.id}
                        movie={movie}
                        onClick={() => goDetail(movie.id)}
                        eager={page === 0 && idx < 10}
                      />
                    ))}
                  </div>
                </InfiniteScroll>
              )}
            </>
          )}
        </div>
      </div>
      <BottomNavigation />
    </>
  );
};

export default Home;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import formatNewlines from "@/utils/formatText";
import InfiniteScroll from "react-infinite-scroll-component";
import MovieSearch from "@/components/home/MovieSearch";
import MovieCard from "@/components/home/MovieCard";
import XIcon from "@/assets/icon/Home/XIcon";
import BottomNavigation from "@components/common/BottomNavigation.jsx";

const mockMovies = [
  { id: 1, title: "하이파이브", posterUrl: "img/test.png", rating: 8.52 },
  { id: 2, title: "엘리오", posterUrl: "img/test.png", rating: 8.8 },
  { id: 3, title: "드래곤 길들이기", posterUrl: "img/test.png", rating: 9.21 },
  { id: 4, title: "28일 후", posterUrl: "img/test.png", rating: 3.24 },
  { id: 5, title: "드래곤 길들이기", posterUrl: "img/test.png", rating: 1.22 },
  { id: 6, title: "좀비딸", posterUrl: "img/test.png", rating: 5.0 },
  { id: 7, title: "좀비아들", posterUrl: "img/test.png", rating: 6.82 },
  { id: 8, title: "그냥좀비", posterUrl: "img/test.png", rating: 10.0 },
  { id: 9, title: "좀비비", posterUrl: "img/test.png", rating: 6.82 },
  { id: 10, title: "좀비영화", posterUrl: "img/test.png", rating: 6.82 },
  { id: 11, title: "좀비는 느리다", posterUrl: "img/test.png", rating: 6.82 },
  { id: 12, title: "빠른 좀비", posterUrl: "img/test.png", rating: 6.82 },
  { id: 13, title: "빠른 좀비", posterUrl: "img/test.png", rating: 6.82 },
  { id: 14, title: "착한 좀비", posterUrl: "img/test.png", rating: 6.82 },
  { id: 15, title: "착한 좀비", posterUrl: "img/test.png", rating: 6.82 },
  { id: 16, title: "착한 좀비", posterUrl: "img/test.png", rating: 6.82 },
  { id: 17, title: "착한 좀비", posterUrl: "img/test.png", rating: 6.82 },
  { id: 18, title: "착한 좀비", posterUrl: "img/test.png", rating: 6.82 },
  { id: 19, title: "착한 좀비", posterUrl: "img/test.png", rating: 6.82 },
  { id: 20, title: "착한 좀비", posterUrl: "img/test.png", rating: 6.82 },
  { id: 21, title: "착한 좀비", posterUrl: "img/test.png", rating: 6.82 },
  { id: 22, title: "착한 좀비", posterUrl: "img/test.png", rating: 6.82 },
  { id: 23, title: "착한 좀비", posterUrl: "img/test.png", rating: 6.82 },
];

const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(["title", "description"]);
  const loadCount = 10;

  const [movies, setMovies] = useState([]);
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [displayedSearchResults, setDisplayedSearchResults] = useState([]);
  const [hasMoreSearch, setHasMoreSearch] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const handleSearch = (keyword) => {
    if (!keyword.trim()) {
      setIsSearching(false);
      setSearchResults([]);
      setDisplayedMovies(movies.slice(0, loadCount));
      setHasMore(movies.length > loadCount);
      return;
    }

    setIsSearching(true);
    setIsLoading(true);

    // API 호출 또는 목 데이터 필터링 예시:
    setTimeout(() => {
      const filtered = movies.filter((movie) =>
        movie.title.toLowerCase().includes(keyword.toLowerCase())
      );
      setSearchResults(filtered);
      setDisplayedSearchResults(filtered.slice(0, loadCount));
      setHasMoreSearch(filtered.length > loadCount);
      setIsLoading(false);
      setHasMore(false);
    }, 500);
  };

  useEffect(() => {
    // 나중에 fetch 함수로 바꾸기
    setMovies(mockMovies);
    setDisplayedMovies(mockMovies.slice(0, loadCount));
    setHasMore(mockMovies.length > loadCount);
  }, []);

  const fetchMoreData = () => {
    if (isSearching) return;
    const currentLength = displayedMovies.length;
    const nextMovies = movies.slice(currentLength, currentLength + loadCount);
    setDisplayedMovies((prev) => [...prev, ...nextMovies]);
    setHasMore(currentLength + nextMovies.length < movies.length);
  };

  const fetchMoreSearchData = () => {
    if (!hasMoreSearch) return;
    const currentLength = displayedSearchResults.length;
    const nextItems = searchResults.slice(
      currentLength,
      currentLength + loadCount
    );
    setDisplayedSearchResults((prev) => [...prev, ...nextItems]);
    setHasMoreSearch(currentLength + nextItems.length < searchResults.length);
  };

  return (
    <>
      <div className="flex flex-col h-screen items-center">
        <MovieSearch onSearch={handleSearch} />
        <div className="w-full ml-9 mt-[27px] mb-4 pretendard_bold text-018">
          {isSearching ? (
            <div className="pretendard_regular text-font-500 mb-2.5">
              {t("description:description_search_count", {
                count: searchResults.length,
              })}
            </div>
          ) : (
            `${t("title:title_home_movie")}`
          )}
        </div>
        <div id="scrollableDiv" className="flex-1 overflow-y-auto pb-20">
          {isSearching ? (
            // 검색 모드일 때 : 로딩 -> 결과 없음 -> 결과 순서로 처리
            isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="pretendard_regular text-center">로딩중...</div>
              </div>
            ) : searchResults.length === 0 ? (
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
              <InfiniteScroll
                dataLength={displayedSearchResults.length}
                next={fetchMoreSearchData}
                hasMore={hasMoreSearch}
                loader={
                  <div className="pretendard_regular text-center mb-1">
                    로딩중...
                  </div>
                }
                scrollableTarget="scrollableDiv"
              >
                <div className="flex flex-wrap justify-center gap-6 w-full">
                  {displayedSearchResults.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      onClick={() => navigate(`/movies/${movie.id}`)}
                    />
                  ))}
                </div>
              </InfiniteScroll>
            )
          ) : (
            <InfiniteScroll
              dataLength={
                (isSearching ? searchResults : displayedMovies).length
              }
              next={fetchMoreData}
              hasMore={!isSearching && hasMore}
              loader={
                !isSearching && (
                  <div className="pretendard_regular text-center mb-1">
                    로딩중...
                  </div>
                )
              }
              scrollableTarget="scrollableDiv"
            >
              <div className="flex flex-wrap justify-center gap-6 w-full">
                {displayedMovies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onClick={() => navigate(`/movies/${movie.id}`)}
                  />
                ))}
              </div>
            </InfiniteScroll>
          )}
        </div>
      </div>
      <BottomNavigation />
    </>
  );
};

export default Home;

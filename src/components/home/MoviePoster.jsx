import React, { useState, useEffect, useRef } from "react";
import { useIO } from "@/hooks/useIO";

const MoviePoster = ({
  src,
  alt,
  className,
  eager = false,
  ioRootId = "scrollableDiv",
}) => {
  const containerRef = useRef(null);
  const imgRef = useRef(null);

  // 내부 스크롤 컨테이너를 IO root로 설정
  const ioRoot =
    typeof document !== "undefined" ? document.getElementById(ioRootId) : null;
  const isVisible = useIO(containerRef, {
    root: ioRoot,
    rootMargin: "200px",
    threshold: 0.01,
  });

  const shouldLoad = eager || isVisible;
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(!src);

  useEffect(() => {
    setLoaded(false);
    setError(!src);
  }, [src, shouldLoad]);

  // 캐시된 이미지 대응: 실제 src가 적용되면 complete 체크로 즉시 표시
  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    if (shouldLoad && el.src && el.complete && el.naturalWidth > 0) {
      setLoaded(true);
      setError(false);
    }
  }, [shouldLoad, src]);

  const actualSrc = shouldLoad && src ? src : undefined;

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {!loaded && !error && (
        <div
          className="w-80 h-50 bg-gray-200 animate-pulse rounded-lg"
          role="status"
          aria-hidden="true"
        />
      )}

      <img
        ref={imgRef}
        key={`${src}-${shouldLoad}`}
        src={actualSrc}
        alt={alt}
        loading={eager ? "eager" : "auto"}
        decoding={eager ? "sync" : "async"}
        fetchpriority={eager ? "high" : "auto"}
        className={`w-80 h-50 rounded-010 object-cover ${
          loaded ? "block" : "hidden"
        }`}
        onLoad={() => {
          setLoaded(true);
          setError(false);
        }}
        onError={() => {
          setError(true);
          setLoaded(false);
        }}
        referrerPolicy="no-referrer"
      />

      {error && (
        <div className="w-80 h-50 bg-gray-100 rounded-lg flex items-center justify-center text-sm text-gray-500">
          {alt}
        </div>
      )}
    </div>
  );
};

export default MoviePoster;

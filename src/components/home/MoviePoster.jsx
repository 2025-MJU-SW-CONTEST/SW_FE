import React, { useState } from "react";

const MoviePoster = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {!loaded && !error && (
        <div
          className="w-80 h-50 bg-gray-200 animate-pulse rounded-lg"
          role="status"
          aria-hidden="true"
        />
      )}

      <img
        src={src}
        alt={alt}
        className={`w-80 h-50 object-cover ${
          loaded ? "block" : "hidden"
        }  ${className}`}
        onLoad={() => setLoaded(true)}
        onError={() => {
          setError(true);
          setLoaded(false);
        }}
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

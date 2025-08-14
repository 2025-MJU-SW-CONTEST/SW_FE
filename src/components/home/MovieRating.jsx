import StarIcon from "@/assets/icon/Home/StarIcon";

const MovieRating = ({ rating, className }) => {
  const starColors = ["#BFA1FA", "#9C8FFB", "#7F7AFD", "#6270FF", "#5A77FF"];

  const scaled = (rating / 10) * 5;
  const starsFillPercent = Array(5)
    .fill(0)
    .map((_, i) => {
      const diff = scaled - i;
      if (diff >= 1) return 100;
      if (diff > 0) return diff * 100;
      return 0;
    });

  return (
    <div className="flex space-x-0.5 items-center">
      {starsFillPercent.map((percent, idx) => (
        <StarIcon key={idx} fillPercent={percent} fillColor={starColors[idx]} />
      ))}
      <span className="ml-[9.36px] leading-6 pretendard_bold text-014 text-primary-800">
        {rating.toFixed(2)}
      </span>
    </div>
  );
};

export default MovieRating;

import BackIcon from "@assets/icon/BackIcon.jsx";

const BackButton = ({ variant = "text", onClick, className }) => {
  if (variant === "icon") {
    return (
      <button onClick={onClick} className={className}>
        <BackIcon />
      </button>
    );
  }

  // 기본은 텍스트 버튼
  return (
    <button onClick={onClick} className={className}>
      뒤로가기
    </button>
  );
};

export default BackButton;

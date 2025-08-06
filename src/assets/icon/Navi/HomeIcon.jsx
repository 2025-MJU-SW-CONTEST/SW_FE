import clsx from 'clsx';

const HomeIcon = ({className, isActive = false}) => {
  return (
    <svg
      width="24"
      height="24"
      className={clsx(className, isActive ? "text-primary": "pretendard_disabled_400")}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13.796 4.136a2.501 2.501 0 0 0 -3.592 0L5.405 9.092a2.013 2.013 0 0 0 -0.532 1.034 28.761 28.761 0 0 0 -0.128 9.624l0.177 1.13a0.733 0.733 0 0 0 0.725 0.62h3.353c0.276 0 0.5 -0.224 0.5 -0.5V14h5V21c0 0.276 0.224 0.5 0.5 0.5h3.353c0.361 0 0.669 -0.263 0.725 -0.62l0.177 -1.13a28.761 28.761 0 0 0 -0.128 -9.623 2.013 2.013 0 0 0 -0.532 -1.034z"
        fill="currentColor"/>
    </svg>

  );
};

export default HomeIcon;
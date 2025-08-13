import clsx from "clsx";

const PersonIcon = ({className, isActive = false}) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={clsx(className, isActive ? "text-primary": "pretendard_disabled_400")}
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.5 3.75C10.4289 3.75 8.75 5.42893 8.75 7.5C8.75 9.57107 10.4289 11.25 12.5 11.25C14.5711 11.25 16.25 9.57107 16.25 7.5C16.25 5.42893 14.5711 3.75 12.5 3.75Z"
        fill="currentColor"/>
      <path
        d="M8.5 13.25C6.42893 13.25 4.75 14.9289 4.75 17V18.1883C4.75 18.9415 5.29588 19.5837 6.03927 19.7051C10.3181 20.4037 14.6819 20.4037 18.9607 19.7051C19.7041 19.5837 20.25 18.9415 20.25 18.1883V17C20.25 14.9289 18.5711 13.25 16.5 13.25H16.1591C15.9746 13.25 15.7913 13.2792 15.6159 13.3364L14.7504 13.6191C13.2881 14.0965 11.7119 14.0965 10.2496 13.6191L9.38407 13.3364C9.20869 13.2792 9.02536 13.25 8.84087 13.25H8.5Z"
        fill="currentColor"/>
    </svg>

  );
};

export default PersonIcon;
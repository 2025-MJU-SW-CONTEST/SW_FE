import clsx from "clsx";

const ScrollArea = ({children, className}) => {
  return (
    <div className="h-screen flex flex-col">
      <div className={clsx("flex-1 overflow-y-auto pb-[64px]", className)}>
        {children}
      </div>
    </div>

  );
};

export default ScrollArea;
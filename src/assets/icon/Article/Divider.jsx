import clsx from "clsx";
const Divider = ({className}) => {
  return (
    <div className={clsx("w-full h-px bg-zinc-100 shadow-[0px_0px_8px_0px_rgba(227,227,227,1.00)]", className)}/>
  );
};

export default Divider;
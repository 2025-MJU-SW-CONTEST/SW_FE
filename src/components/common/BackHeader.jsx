import BackButton from "@/components/common/BackButton";

const BackHeader = ({ label, onBack }) => {
  return (
    <header className="flex items-center px-7.5 pt-[59px] rounded-b-010 pb-4.5 shadow-md shadow-bottom-neutral-200 ">
      <BackButton variant="icon" onClick={onBack} className="mr-1" />
      <div className="pretendard_bold text-020 leading-7.5">{label}</div>
    </header>
  );
};

export default BackHeader;

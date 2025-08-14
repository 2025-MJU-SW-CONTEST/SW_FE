import LeftArrowIcon from "@assets/icon/Article/LeftArrowIcon.jsx";
import RightArrowIcon from "@assets/icon/Article/RightArrowIcon.jsx";
import {useState} from "react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";

const weekdaysShort = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function CustomCaption() {
  return (
    <div className="hidden"></div>
  )
}

export default function CustomCalendar({date}) {
  const [month, setMonth] = useState(new Date());
  const defaultClassNames = getDefaultClassNames();

  const handlePrevMonth = () => {
    const prev = new Date(month);
    prev.setMonth(month.getMonth() - 1);
    setMonth(prev);
  };

  const handleNextMonth = () => {
    const next = new Date(month);
    next.setMonth(month.getMonth() + 1);
    setMonth(next);
  };

  return (
    <div className="flex flex-col items-center px-020 min-h-[200px]">
      <div className="w-full flex justify-center">
        <div className="flex items-center gap-6 mb-[19px]">
          <button onClick={handlePrevMonth} aria-label="이전 달">
            <LeftArrowIcon/>
          </button>
          <p className="text-lg font-semibold">
            {month.toLocaleString("en-US", {year: "numeric", month: "long"})}
          </p>
          <button onClick={handleNextMonth} aria-label="다음 달">
            <RightArrowIcon/>
          </button>
        </div>
      </div>
      <DayPicker
        weekStartsOn={0}
        mode="single"
        formatters={{
          formatWeekdayName: (day) => weekdaysShort[day.getDay()],
        }}
        month={month}
        onMonthChange={setMonth}
        classNames={{
          day: 'w-[55px] h-[55px] pl-1',
          chevron: `${defaultClassNames.chevron} fill-primary w-10 h-5 rounded-full`,
          weekdays: `${defaultClassNames.weekdays} text-[12px] text-gray2`,
          weekday: `${defaultClassNames.weekday} nth-1:text-red last-of-type:text-blue`,
          selected: `${defaultClassNames.selected}`,
          monthCaption: 'hidden'
        }}
        components={{
          MonthCaption: CustomCaption,
        }}
        navLayout="none"
      />
    </div>
  );
}

import BottomNavigation from "@components/common/BottomNavigation.jsx";
import CustomCalendar from "@components/article/CustomCalendar.jsx";
import Blank from "@components/article/Blank.jsx";
import Divider from "@components/article/Divider.jsx";
import AddButton from "@components/common/AddButton.jsx";
import Content from "@components/article/Content.jsx";
import ScrollArea from "@components/common/ScrollArea.jsx";

import {pagePath} from "@routes/pagePath.js";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

const dummyData = ["2025-08-13", "2025-08-15"]

const Article = () => {
  const [selectDay, setSelectDay] = useState(null);
  const modifiers =  dummyData.map(dateStr => new Date(dateStr))

  const navigate = useNavigate();


  return (
    <div>
      <ScrollArea className="pb-[81px]">
        <div className="mt-[21px]">
          <CustomCalendar
            modifiers={modifiers}
            selectedDay={selectDay}
            setSelectedDay={setSelectDay}
          />
          <Divider className="mt-[33px]"/>
          {/*<div className="px-016 mt-[17px]"><Content/></div>*/}
          <Blank type={selectDay ? "article": "date"}/>
        </div>
        <AddButton
          className="bottom-[85px]"
          onClick={() => navigate("/" + pagePath.ARTICLEEDIT)}
        />
      </ScrollArea>
      <BottomNavigation/>
    </div>
  );
};

export default Article;
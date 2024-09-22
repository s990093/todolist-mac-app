"use client";
import { useEffect, useState } from "react";
import Card from "./Card";

const tasks: Record<number, string> = {
  0: "周日：周末自我檢討與計劃",
  1: "周一：數學作業截止",
  2: "周二：物理實驗報告提交",
  3: "周三：英語口試準備",
  4: "周四：化學期中考復習",
  5: "周五：歷史報告發表",
  6: "周六：參加數學競賽",
};

const Home: React.FC = () => {
  const [today, setToday] = useState<number>(0);

  useEffect(() => {
    const currentDay = new Date().getDay();
    setToday(currentDay);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <h1 className="text-3xl font-bold text-center text-navyBlues mb-10">
        每週重要課業事項
      </h1>
      <div className="grid grid-cols-1 gap-6">
        {/* 显示当天的卡片 */}
        <Card
          day={`今天：${tasks[today].split("：")[0]}`}
          task={tasks[today].split("：")[1]}
          isToday={true}
        />

        {/* 显示其他天的卡片 */}
        {Object.keys(tasks).map(
          (key) =>
            Number(key) !== today && (
              <Card
                key={key}
                day={`${tasks[Number(key)].split("：")[0]}：`}
                task={tasks[Number(key)].split("：")[1]}
                isToday={false}
              />
            )
        )}
      </div>
    </div>
  );
};

export default Home;

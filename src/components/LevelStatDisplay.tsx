import { useEffect, useState } from "react";
import { type LevelStats } from "~/models/types";

interface Props {
  levelStats: LevelStats;
}

export const LevelStatDisplay: React.FC<Props> = ({ levelStats }) => {
  const [clientDate, setClientDate] = useState("");

  useEffect(() => {
    setClientDate(new Date(levelStats.evolveTs).toLocaleTimeString());
  }, [levelStats.evolveTs]);

  return (
    <div className="mx-1 flex rounded bg-gray-300 p-1 px-4 py-2 font-bold text-gray-800 xs:w-full xs:flex-row sm:w-3/12 sm:flex-col">
      <h2>Level</h2>
      {Object.entries(levelStats).map(([key, stat]) => {
        return (
          <span
            className="my-1 rounded bg-gray-100 p-1 px-4 py-2 font-bold text-gray-800"
            key={key}
          >
            {`${key}: ${key === "evolveTs" ? clientDate : stat}`}
          </span>
        );
      })}
    </div>
  );
};

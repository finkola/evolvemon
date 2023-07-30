import { useEffect, useState } from "react";
import { type Stats } from "~/models/types";
import { StatusBar } from "./StatusBar";

interface Props {
  stats: Stats;
}

export const StatDisplay: React.FC<Props> = ({ stats }) => {
  const [clientDate, setClientDate] = useState("");

  useEffect(() => {
    setClientDate(new Date(stats.target).toLocaleTimeString());
  }, [stats.target]);

  return (
    <div className="mx-1 flex rounded bg-gray-300 p-1 px-4 py-2 font-bold text-gray-800 xs:w-full xs:flex-row sm:w-3/12 sm:flex-col">
      <h2>Stats</h2>
      <StatusBar stats={stats} />
      {Object.entries(stats).map(([key, stat]) => {
        return (
          <span
            className="my-1 rounded bg-gray-100 p-1 px-4 py-2 font-bold text-gray-800"
            key={key}
          >
            {`${key}: ${key === "target" ? clientDate : stat}`}
          </span>
        );
      })}
    </div>
  );
};

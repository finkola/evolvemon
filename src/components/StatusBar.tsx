import { useEffect, useState } from "react";
import { type Stats } from "~/models/types";

interface Props {
  stats: Stats;
}

export const StatusBar: React.FC<Props> = ({ stats }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const timerId = setInterval(() => {
      const correctedDelta = stats.target - Date.now() + stats.range;
      const maxVal = stats.range * 2;
      if (correctedDelta > maxVal) {
        setValue(100);
      }

      if (correctedDelta < maxVal && correctedDelta > 0) {
        setValue((100 * correctedDelta) / maxVal);
      }

      if (correctedDelta < 0) {
        setValue(0);
      }
    }, 100);

    return () => clearInterval(timerId);
  }, [stats]);

  return (
    <progress max="100" value={value}>
      {value}
    </progress>
  );
};

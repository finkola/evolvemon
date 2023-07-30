import { type Traits } from "~/models/types";

interface Props {
  traits: Traits;
}

export const TraitsDisplay: React.FC<Props> = ({ traits }) => {
  return (
    <div className="mx-1 flex rounded bg-gray-300 p-1 px-4 py-2 font-bold text-gray-800 xs:w-full xs:flex-row sm:w-3/12 sm:flex-col">
      <h2>Traits</h2>
      {Object.entries(traits).map(([key, stat]) => {
        return (
          <span
            className="my-1 rounded bg-gray-100 p-1 px-4 py-2 font-bold text-gray-800"
            key={key}
          >
            {`${key}: ${stat}`}
          </span>
        );
      })}
    </div>
  );
};

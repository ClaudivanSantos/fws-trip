import { AiOutlineCheckCircle } from "react-icons/ai";

interface TripsHighlightsProps {
  highlights: string[];
}

export function TripsHighlights({ highlights }: TripsHighlightsProps) {
  return (
    <div className="flex flex-col p-5">
      <h2 className="font-semibold text-primaryDarker mb-2">Destaques</h2>
      <div className="flex flex-wrap gap-y-3">
        {highlights.map((highlights, index) => (
          <div className="flex items-center gap-2 w-1/2" key={index}>
            <AiOutlineCheckCircle color="purple" />
            <p className="text-grayPrimary text-xs">{highlights}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

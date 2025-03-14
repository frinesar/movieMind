import React from "react";

function RatingSelector({
  value,
  onChange,
}: {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  const color =
    value >= 8 ? "text-excellent" : value >= 6 ? "text-average" : "text-bad";
  return (
    <div>
      <select
        className={`text-center font-main font-bold w-fit ${color}`}
        value={value}
        onChange={onChange}
      >
        {/* @ts-ignore */}
        {[...Array(10)].map((item, index) => (
          <option
            className="text-main dark:text-mainDark bg-itemBackground dark:bg-itemBackgroundDark "
            value={index + 1}
          >
            {index + 1}
          </option>
        ))}
      </select>
      <span>/10</span>
    </div>
  );
}

export default RatingSelector;

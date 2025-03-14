import { ChangeEvent } from "react";

function SearchField({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="relative">
      <input
        value={value}
        onChange={onChange}
        placeholder="Searching for..."
        className="border-2 border-main dark:border-mainDark active:border-accent rounded-xl w-full py-1 pl-8"
      />
      <svg className="absolute top-1 left-2" height={24} width={24}>
        <use href="/icons.svg#search" />
      </svg>
    </div>
  );
}

export default SearchField;

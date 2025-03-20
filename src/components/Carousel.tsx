import { ReactNode, useRef } from "react";

export default function Carousel({ children }: { children: ReactNode }) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const scrollAmount = carouselRef.current.clientWidth;
    carouselRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      <button
        onClick={() => handleScroll("left")}
        className={`hidden md:block absolute left-1 top-1/2 -translate-y-1/2 p-2 bg-itemBackgroundDark/50 dark:bg-itemBackground/50 text-mainDark dark:text-main rounded-full shadow z-40`}
      >
        <svg height={24} width={24}>
          <use href="/icons.svg#chevron_left" />
        </svg>
      </button>

      <div
        ref={carouselRef}
        className="flex gap-2.5 px-1 overflow-x-auto scroll-smooth flex-nowrap py-4 snap-x snap-mandatory md:snap-none scroll-px-1"
      >
        {children}
      </div>

      <button
        onClick={() => handleScroll("right")}
        className="hidden md:block absolute right-1 top-1/2 -translate-y-1/2 p-2 bg-itemBackgroundDark/50 dark:bg-itemBackground/50 text-mainDark dark:text-main rounded-full shadow"
      >
        <svg height={24} width={24}>
          <use href="/icons.svg#chevron_right" />
        </svg>
      </button>
    </div>
  );
}

import { ReactNode } from "react";

function Button({
  children,
  icon,
  className,
}: {
  children: ReactNode;
  icon?: string;
  className?: string;
}) {
  return (
    <button className={`py-1 px-6 ${className}`}>
      {icon && (
        <svg>
          <use href={`/icons.svg#${icon}`} className="mr-2.5" />
        </svg>
      )}
      <span className="leading-none font-medium ">{children}</span>
    </button>
  );
}

export default Button;

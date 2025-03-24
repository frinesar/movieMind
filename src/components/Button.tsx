import { ReactNode } from "react";

function Button({
  children,
  icon,
  className,
  disabled,
  type,
  onClick,
}: {
  children?: ReactNode;
  type: "primary" | "secondary" | "accent";
  icon?: string;
  className?: string;
  disabled?: boolean;
  onClick?: (x?: any) => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`py-1.5 px-5 ${
        disabled ? "cursor-wait" : "cursor-pointer"
      } border-4 ${
        type === "accent"
          ? "border-accent"
          : type === "primary"
          ? "border-primary"
          : "border-secondary"
      } rounded-full leading-none ${className}`}
    >
      {icon && (
        <svg
          height={20}
          width={20}
          className={`inline-block align-middle ${children && "mr-1"}`}
        >
          <use href={`/icons.svg#${icon}`} />
        </svg>
      )}
      <span className="leading-none font-medium inline-block align-middle">
        {children}
      </span>
    </button>
  );
}

export default Button;

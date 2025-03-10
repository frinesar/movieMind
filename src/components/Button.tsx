import { ReactNode } from "react";

function Button({
  children,
  icon,
  className,
  disabled,
  onClick,
}: {
  children: ReactNode;
  icon?: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`py-1.5 px-5 ${
        disabled ? "cursor-wait" : "cursor-pointer"
      } border-4 border-accent rounded-full leading-none ${className}`}
    >
      {icon && (
        <svg height={20} width={20} className="mr-1 inline-block align-middle">
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

import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type SecondaryButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

export function SecondaryButton({
  href,
  className = "",
  children,
  ...props
}: SecondaryButtonProps) {
  return (
    <Link
      href={href}
      className={`button-secondary button-target group ${className}`.trim()}
      {...props}
    >
      <span aria-hidden="true" className="button-corner button-corner-top-left">
        +
      </span>
      <span aria-hidden="true" className="button-corner button-corner-top-right">
        +
      </span>
      <span aria-hidden="true" className="button-corner button-corner-bottom-left">
        +
      </span>
      <span aria-hidden="true" className="button-corner button-corner-bottom-right">
        +
      </span>
      <span className="button-label">{children}</span>
    </Link>
  );
}

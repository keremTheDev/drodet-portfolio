import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type PrimaryButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

export function PrimaryButton({
  href,
  className = "",
  children,
  ...props
}: PrimaryButtonProps) {
  return (
    <Link
      href={href}
      className={`button-primary button-target group ${className}`.trim()}
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

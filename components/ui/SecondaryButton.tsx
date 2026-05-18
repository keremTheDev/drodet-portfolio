import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";

type SecondaryButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

export function SecondaryButton({
  href,
  className = "",
  children,
  ...props
}: SecondaryButtonProps) {
  return (
    <Link href={href} className={`button-secondary ${className}`.trim()} {...props}>
      {children}
    </Link>
  );
}

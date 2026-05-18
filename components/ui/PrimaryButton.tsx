import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";

type PrimaryButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

export function PrimaryButton({
  href,
  className = "",
  children,
  ...props
}: PrimaryButtonProps) {
  return (
    <Link href={href} className={`button-primary ${className}`.trim()} {...props}>
      {children}
    </Link>
  );
}

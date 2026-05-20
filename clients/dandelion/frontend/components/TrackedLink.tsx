"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/api";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  event?: string;
  metadata?: Record<string, unknown>;
};

export function TrackedLink({ href, children, className, event = "cta_click", metadata = {} }: Props) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => {
        void trackEvent(event, { href, ...metadata });
      }}
    >
      {children}
    </Link>
  );
}

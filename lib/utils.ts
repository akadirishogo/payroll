import { clsx } from "clsx"; // or 'tailwind-merge' for merging conflicting Tailwind classes

export function cn(...args: any[]) {
  return clsx(...args);
}

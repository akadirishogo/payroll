import { clsx } from "clsx"; // or 'tailwind-merge' for merging conflicting Tailwind classes

export function cn(...args) {
  return clsx(...args);
}

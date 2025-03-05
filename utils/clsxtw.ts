import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * A utility function to merge classnames and tw classes.
 * 
 * @param {ClassValue} classes - The classnames to merge.
 * @returns {string} - The merged classnames.
 */


export const cn = (...classes: ClassValue[]) => twMerge(clsx(...classes));
/*
const cn = (...classes: ClassValue[]): string => {
  return twMerge(clsx(classes));
}
export { cn };
*/
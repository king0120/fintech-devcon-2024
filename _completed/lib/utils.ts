import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatMoney = (amount: number) => {
  return amount.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
}

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}
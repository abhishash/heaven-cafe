import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatPrice(amount: number, currencyCode = "USD", locale = "en-US") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
  }).format(amount);
}
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

export const encodeId = (id: number) => {
  return btoa(id.toString());
};


export const decodeId = (encodedId: string) => {
  return atob(encodedId);
};

export function formatIndianDateTime(dateString: string) {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).format(date);
}
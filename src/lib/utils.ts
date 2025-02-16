import { clsx, type ClassValue } from "clsx";
import { formatDate } from "date-fns";
import { es } from "date-fns/locale";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatEsFullDate(date: Date) {
    const created_at = new Date(date);
    const format = "EEEE, d 'de' MMMM 'de' yyyy";
    return formatDate(created_at, format, { locale: es });
}

export function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

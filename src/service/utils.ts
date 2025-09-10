import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function generateTimeStamps(intervalMinutes: number) {
    const result = [];
    const totalMinutesInDay = 24 * 60;

    for (let minutes = 0; minutes <= totalMinutesInDay; minutes += intervalMinutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        const hh = String(hours).padStart(2, '0');
        const mm = String(mins).padStart(2, '0');

        result.push(`${hh}:${mm}`);
    }
    if (result.at(-1) === '24:00') {
        result.pop();
    }
    return result;
}

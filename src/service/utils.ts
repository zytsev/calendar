import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { v4 as uuidv4 } from 'uuid';

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

export function generateWeeklyTimeRanges(intervalMinutes: number, numberDayOfWeek: number) {
    const result = [];
    const totalMinutesInDay = 24 * 60;

    const now = new Date();

    // Определяем понедельник текущей недели в 00:00 UTC
    const day = now.getUTCDay(); // 0 = Sunday, 1 = Monday ...
    const diffToMonday = day === 0 ? -6 : 1 - day;
    const monday = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + diffToMonday, 0, 0, 0, 0));

    // Границы рабочего времени (UTC)
    const workStartMinutes = 9 * 60; // 09:00
    const workEndMinutes = 18 * 60; // 18:00

    for (let minutes = 0; minutes < totalMinutesInDay; minutes += intervalMinutes) {
        const start = new Date(monday.getTime() + minutes * 60 * 1000);
        const end = new Date(start.getTime() + intervalMinutes * 60 * 1000);

        const startMinutes = minutes;
        const endMinutes = minutes + intervalMinutes;

        const isWorking = startMinutes >= workStartMinutes && endMinutes <= workEndMinutes;

        result.push({
            id: uuidv4(),
            startTime: start.getTime() * numberDayOfWeek, // timestamp в мс
            endTime: end.getTime() * numberDayOfWeek,
            isWorking: isWorking,
        });
    }

    return result;
}

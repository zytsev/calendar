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

export function timestampToHHMM(ts: number) {
    const date = new Date(ts);

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${hours}.${minutes}`;
}

export function generateWeeklyTimeRanges(intervalMinutes: number, numberDayOfWeek: number) {
    const result = [];
    const totalMinutesInDay = 24 * 60;

    const now = new Date();

    // Определяем понедельник текущей недели в 00:00 (локальное время)
    const day = now.getDay(); // 0 = Sunday, 1 = Monday ...
    const diffToMonday = day === 0 ? -6 : 1 - day;
    const monday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + diffToMonday, 0, 0, 0, 0);

    // Смещение для дня недели
    const dayOffset = numberDayOfWeek * 24 * 60 * 60 * 1000;

    // Границы рабочего времени (локальное время)
    const workStartMinutes = 9 * 60; // 09:00
    const workEndMinutes = 18 * 60; // 18:00

    for (let minutes = 0; minutes < totalMinutesInDay; minutes += intervalMinutes) {
        const start = new Date(monday.getTime() + dayOffset + minutes * 60 * 1000);
        const end = new Date(start.getTime() + intervalMinutes * 60 * 1000);

        const startMinutes = minutes;
        const endMinutes = minutes + intervalMinutes;

        const isWorking = startMinutes >= workStartMinutes && endMinutes <= workEndMinutes;

        result.push({
            id: uuidv4(),
            startTime: start.getTime(), // timestamp в мс (локальное время)
            endTime: end.getTime(),
            isWorking,
            isBooking: false,
            student: '',
            startTimeBooking: 0,
            endTimeBooking: 0,
        });
    }

    return result;
}

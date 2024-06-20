import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc)

export function getCurrentUtcTime(): string {
    return dayjs().utc().format('YYYY-MM-DD HH:mm:ss');
}

export function convertToUtcTime(time: Date): string {
    return dayjs(time).utc().format('YYYY-MM-DD HH:mm:ss');
}

export function getDate(dateString: string): string {
    const day = dayjs(dateString).date().toString();
    const month = (dayjs(dateString).month() + 1).toString();
    const year = dayjs(dateString).year().toString();
    return `${day}/${month}/${year}`
}

export function getTime(dateString: string): string {
    const hours = dayjs(dateString).hour().toString().padStart(2, '0');
    const minutes = dayjs(dateString).minute().toString().padStart(2, '0');
    return `${hours}:${minutes}`
}
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc)

export function getCurrentUtcTime(): string {
    return dayjs().utc().format('YYYY-MM-DD HH:mm:ss');
}

export function convertToUtcTime(time: Date): string {
    return dayjs(time).utc().format('YYYY-MM-DD HH:mm:ss');
}
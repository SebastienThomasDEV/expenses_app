export function dateToUnix(date: number): number {
    return Math.floor(new Date(date).getTime() / 1000)
}

export function unixToDate(unix: number): Date {
    return new Date(unix * 1000)
}


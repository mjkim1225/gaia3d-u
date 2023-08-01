
export const getTodayWithTime = (timeString: string) => {
    // ex time "08:10:05"
    const today = new Date();
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    return new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours, minutes, seconds);
}
export const plus9hours = (jsDate: Date) => {
    jsDate.setHours(jsDate.getHours() + 9);
}

export class Period {
    startDateTime;
    endDateTime;
    constructor(startDateTime, endDateTime) {
        this.startDateTime = new Date(startDateTime);
        this.endDateTime = new Date(endDateTime);
    }

    contains(dateTime) {
        const date = new Date(dateTime);
        return (date >= this.startDateTime && date <= this.endDateTime)
            || date == this.endDateTime;
    }
}

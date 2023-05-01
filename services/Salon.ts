import {BotErrors} from "../models/Entities";
import {Api} from "./Api";
import {getFormattedDate} from "../helpers";

class SalonService {
    static async loadEvents(forceToday = false) {
        const today = getFormattedDate(new Date());
        let tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow = getFormattedDate(tomorrow);

        const {data} = await Api.post('/loadScheduleEvents', {day: forceToday ? today : tomorrow})
        return data;
    }

    static async loadSpecificEvents(day: number, month: number) {
        let date = new Date();

        if (!day || !month) return Promise.reject(BotErrors.ParseDateError)

        date.setDate(day)
        date.setMonth(month - 1)
        date = getFormattedDate(date);

        const {data} = await Api.post('/loadScheduleEvents', { day: date })
        return data;
    }

}

export default SalonService

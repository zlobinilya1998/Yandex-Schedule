import {BotErrors} from "../models/Entities.js";
import {Api} from "./Api.js";
import {getFormattedDate} from "../helpers/index.js";

class SalonService {
    static async loadEvents(forceToday = false) {
        const today = getFormattedDate(new Date());
        let tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow = getFormattedDate(tomorrow);

        const {data} = await Api.post('/loadScheduleEvents', {day: forceToday ? today : tomorrow})
        return data;
    }

    static async loadSpecificEvents(day, month) {
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

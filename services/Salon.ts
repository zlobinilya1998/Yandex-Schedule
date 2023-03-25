import { config } from "dotenv";
import axios from "axios";
import { BotErrors } from "../models/Entities";

config();

const Cookie = process.env.COOKIE;

class SalonService {
    static salonPrefix = "msc_persona_malaya_nikitskaya";
    static baseUrl = `https://profsalon.org/CRM/${this.salonPrefix}/desktop`;

    static async loadEvents(forceToday = false) {
        const today = new Date().toLocaleString("ru-Ru").split(",")[0];
        let tomorow: string | Date = new Date();
        tomorow.setDate(tomorow.getDate() + 1);
        tomorow = tomorow.toLocaleString("ru-Ru").split(",")[0];

        const api_url = this.baseUrl + "/loadScheduleEvents";
        const { data } = await axios.post(
            api_url,
            {
                day: forceToday ? today : tomorow,
            },
            {
                headers: {
                    Cookie,
                },
            }
        );
        return data;
    }

    static async loadSpecificEvents(day, month) {
        let date: string | Date = new Date();

        if (!day || !month) return Promise.reject(BotErrors.ParseDateError);

        date.setDate(day);
        date.setMonth(month - 1);
        date = date.toLocaleString("ru-Ru").split(",")[0];

        const api_url = this.baseUrl + "/loadScheduleEvents";
        const { data } = await axios.post(
            api_url,
            {
                day: date,
            },
            {
                headers: {
                    Cookie,
                },
            }
        );
        return data;
    }
}

export default SalonService;

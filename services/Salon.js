import {config} from 'dotenv'
config()

import axios from "axios";
const Cookie = process.env.COOKIE

class SalonService {
    static baseUrl = 'https://profsalon.org/CRM/msc_persona_malaya_nikitskaya/desktop';
    static async loadEvents(forceToday = false){
        const today = new Date().toLocaleString('ru-Ru').split(',')[0];
        let tomorow = new Date()
        tomorow.setDate(tomorow.getDate() + 1);
        tomorow = tomorow.toLocaleString('ru-Ru').split(',')[0]

        const api_url = this.baseUrl + '/loadScheduleEvents';
        const { data } = await axios.post(api_url, {
            day: '22.10.2022',
        }, {
            headers: {
                Cookie
            },
        })
        return data;
    }
}

export default SalonService

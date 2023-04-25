import axios from "axios";
const Cookie = process.env.COOKIE


const Api = axios.create({
    baseURL: 'https://profsalon.org/CRM/msc_persona_malaya_nikitskaya/desktop',
    headers: {
        Cookie
    },
})

export {
    Api,
}

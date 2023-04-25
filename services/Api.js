import axios from "axios";

import {config} from "dotenv";
config()

const Cookie = process.env.COOKIE


const Api = axios.create({
    baseURL: 'https://profsalon.org/CRM/msc_persona_malaya_nikitskaya/desktop',
    headers: {
        Cookie
    },
})

Api.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

export {
    Api,
}

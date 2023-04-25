import {Api} from "../services/Api.js";

export const logger = async (req, res, next) => {
    console.log(req.method, req.path, new Date().toLocaleTimeString());
    next();
}

export const authChecker = async (req, res, next) => {
    const {data} = await Api.post('/loadScheduleEvents', { day: '24-11-1998' });
    console.log(data)
    if (data.error && data.error == 403){
        console.log('Требуется реавторизация')
    }
    next();
}

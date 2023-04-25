import {Api} from "../services/Api.js";
import {ApiError} from "../exceptions/index.js";

export const logger = async (req, res, next) => {
    console.log(req.method, req.path, new Date().toLocaleTimeString());
    next();
}

export const authChecker = async (req, res, next) => {
    const {data} = await Api.post('/loadScheduleEvents', { day: '25.04.2023' });
    if (data.error && data.error == 403){
        console.log('Требуется реавторизация', data)
        return res.status(403).send()
    }
    next();
}

export const errorHandler = function (err, req, res, next){
    console.log(err)

    if (err instanceof ApiError){
        return res.status(200).send(err.response)
    }

    res.status(500).send({
        message: 'Server error'
    });
}


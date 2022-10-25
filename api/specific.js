import {getDefaultResponse} from "../helpers";

const {EventsTransformer} = require("../helpers");
const SalonService = require("../services/Salon");

const specific = async (req,res) => {
    const response = getDefaultResponse(req.body);
    const entities = response.request.nlu.entities;


    const dateTime = entities.find(entity => entity.type === "YANDEX.DATETIME");

    if (dateTime){
        const month = dateTime.value.month;
        const day = dateTime.value.day;

        const events = await SalonService.loadSpecificEvents(day,month);
        return res.send(events)
    } else {
        response.response.text = 'Мне не удалось распознать дату';
        response.session.end_session = true;
    }

    res.send({response})
}

export default specific;

import {getDefaultResponse} from "../helpers/index.js";
import {BotErrors} from "../models/Entities.js";
import {EventsTransformer} from '../helpers/index.js'
import {SalonService} from '../services'

const specific = async (req, res, next) => {
    const response = getDefaultResponse(req.body);
    const entities = response.request.nlu.entities;


    const dateTime = entities.find(entity => entity.type === "YANDEX.DATETIME");

    let data = [];

    if (!dateTime) {
        response.response.text = BotErrors.ParseDateError;
        response.session.end_session = true;
        return res.send(response)
    }

    const month = dateTime.value.month;
    const day = dateTime.value.day;

    try {
        data = await SalonService.loadSpecificEvents(day, month);

        if (data.error && data.error == 403){
            response.response.text = "Не могу авторизироваться в системе профсалон, обновите куки";
            response.response.end_session = true;
            return res.send(response)
        }

        const events = EventsTransformer.transformIntoView(data.events);

        let eventsText = ''
        events.forEach(event => eventsText += EventsTransformer.getEventText(event));

        if (events.length) response.response.text = eventsText;
        else response.response.text = BotErrors.NoPeriodRecords;
        response.response.end_session = true;
        return res.send(response)
    } catch (e) {
        response.response.text = BotErrors.UnhandedException;
        response.response.end_session = true;
        return res.send(response)
    }
}

export default specific;

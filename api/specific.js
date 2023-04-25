import {getDefaultResponse} from "../helpers/index.js";
import {BotErrors} from "../models/Entities.js";
import {EventsTransformer} from '../helpers/index.js'
import SalonService from '../services/Salon.js'
import {ApiError} from "../exceptions/index.js";

const specific = async (req, res, next) => {
    try {
        const response = getDefaultResponse(req.body);
        const entities = response.request.nlu.entities;

        const dateTime = entities.find(entity => entity.type === "YANDEX.DATETIME");

        let data = [];
        if (!dateTime) throw ApiError.ParseDateException(response)

        const month = dateTime.value.month;
        const day = dateTime.value.day;

        data = await SalonService.loadSpecificEvents(day, month);
        const events = EventsTransformer.transformIntoView(data.events);

        let eventsText = ''
        events.forEach(event => eventsText += EventsTransformer.getEventText(event));

        if (events.length) response.response.text = eventsText;
        else response.response.text = BotErrors.NoPeriodRecords;
        response.response.end_session = true;
        return res.send(response)
    } catch (e) {
        return next(e);
    }
}

export default specific;

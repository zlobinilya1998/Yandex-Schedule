import {getDefaultResponse} from "../helpers";
import BotErrors from "../errors";

const {EventsTransformer} = require("../helpers");
const SalonService = require("../services/Salon");

const specific = async (req,res) => {
    const response = getDefaultResponse(req.body);
    const entities = response.request.nlu.entities;


    const dateTime = entities.find(entity => entity.type === "YANDEX.DATETIME");

    let data = [];
    if (dateTime){
        const month = dateTime.value.month;
        const day = dateTime.value.day;

        try {
            data = await SalonService.loadSpecificEvents(day,month);
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

    } else {
        response.response.text = BotErrors.ParseDateError;
        response.session.end_session = true;
    }

    res.send({response})
}

export default specific;

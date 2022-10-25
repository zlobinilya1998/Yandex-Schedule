import {getDefaultResponse} from "../helpers";

const {EventsTransformer} = require("../helpers");
const SalonService = require("../services/Salon");

const specific = async (req,res) => {
    const response = getDefaultResponse(req.body);
    const entities = response.request.nlu.entities;


    if (entities.some(entity => entity.type === "YANDEX.DATETIME")){
        return res.send(entities)
    }


    let data = [];




    try {
        data = await SalonService.loadEvents(true)
    } catch (e) {
        return res.status(500).send();
    }

    const events = EventsTransformer.transformIntoView(data.events);
    let eventsText = ''
    events.forEach(event => eventsText += EventsTransformer.getEventText(event));

    res.send(eventsText)
}

export default specific;

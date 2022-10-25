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
        return res.send({month,day})
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

import {getDefaultResponse} from "../helpers";

const {EventsTransformer} = require("../helpers");
const SalonService = require("../services/Salon");

const specific = async (req,res) => {
    const response = getDefaultResponse(req.body);
    const entities = response.request.nlu.entities;


    const dateTime = entities.find(entity => entity.type === "YANDEX.DATETIME");

    if (response.session.new){
        response.response.text = 'За какую дату показать запись?';
        return res.send(response)
    }

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
            else response.response.text = 'На выбранный период никто не записался';
            response.response.end_session = true;
            return res.send(response)
        } catch (e) {
            response.response.text = e;
            return res.send(response)
        }

    } else {
        response.response.text = 'Мне не удалось распознать дату';
        response.session.end_session = true;
    }

    res.send({response})
}

export default specific;

import {EventsTransformer, getDefaultResponse} from "../helpers";
import SalonService from "../services/Salon";

export default async function tomorrow(req,res){
    const response = getDefaultResponse(req.body);

    let data = [];
    try {
        data = await SalonService.loadEvents(false)
    } catch (e) {
        response.response.text = 'Произошла ошибка при запросе данных из салона'
        response.response.end_session = true;
        return res.send(response);
    }

    const events = EventsTransformer.transformIntoView(data.events);
    let eventsText = ''
    events.forEach(event => eventsText += EventsTransformer.getEventText(event));

    if (events.length) response.response.text = eventsText;
    else response.response.text = 'На завтра никто не записался, можете отдохнуть';

    response.response.end_session = true;
    res.send(response)
}

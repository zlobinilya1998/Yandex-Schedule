import {BotErrors, Day} from '../models/Entities.js'
import {EventsTransformer,getDefaultResponse} from '../helpers/index.js'
import SalonService from '../services/Salon.js'

const record = async (req,res) => {
    const response = getDefaultResponse(req.body);
    const tokens = response.request.nlu.tokens;

    const isToday = tokens.includes(Day.Today);
    const isTomorrow = tokens.includes(Day.Tomorrow);

    if (!isToday && !isTomorrow) {
        response.response.text = BotErrors.InvalidInputDay;
        response.response.end_session = true;
        return res.send(response);
    }

    let data = [];

    try {
        data = await SalonService.loadEvents(isToday)
    } catch (e) {
        response.response.text = BotErrors.FetchDataError;
        response.response.end_session = true;
        return res.send(response);
    }

    const events = EventsTransformer.transformIntoView(data.events);
    let eventsText = ''
    events.forEach(event => eventsText += EventsTransformer.getEventText(event));

    if (events.length) response.response.text = eventsText;
    else response.response.text = BotErrors.NoPeriodRecords;
    response.response.end_session = true;
    res.send(response)
}

export default record


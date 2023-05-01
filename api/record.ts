import {BotErrors, Day} from '../models/Entities'
import {EventsTransformer, getDefaultResponse} from '../helpers'
import {SalonService} from '../services'
import {ApiError} from '../exceptions';

const record = async (req, res, next) => {
    try {
        const response = getDefaultResponse(req.body);
        const tokens = response.request.nlu.tokens;

        const isToday = tokens.includes(Day.Today);
        const isTomorrow = tokens.includes(Day.Tomorrow);

        if (!(isToday && isTomorrow)) throw ApiError.InvalidInputDay(response);
        let data = [];
        data = await SalonService.loadEvents(isToday)
        const events = EventsTransformer.transformIntoView(data.events);
        let eventsText = ''
        events.forEach(event => eventsText += EventsTransformer.getEventText(event));

        if (events.length) response.response.text = eventsText;
        else response.response.text = BotErrors.NoPeriodRecords;
        response.response.end_session = true;
        res.send(response)
    } catch (e) {
        next(e)
    }
}

export default record


import {BotErrors, Day} from '../models/Entities.js'
import {EventsTransformer, getDefaultResponse} from '../helpers/index.js'
import SalonService from '../services/Salon.js'

const record = async (req, res, next) => {
    try {
        const response = getDefaultResponse(req.body);
        const tokens = response.request.nlu.tokens;

        const isToday = tokens.includes(Day.Today);
        const isTomorrow = tokens.includes(Day.Tomorrow);

        if (!isToday && !isTomorrow) throw new ApiError.InvalidInputDay(response);
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


const {getDefaultResponse, EventsTransformer} = require("../helpers");
const SalonService = require("../services/Salon");

export default async function record(req,res){
    const response = getDefaultResponse(req.body);
    const tokens = response.request.nlu.tokens;

    const isToday = tokens.includes('сегодня');
    const isTomorrow = tokens.includes('завтра');

    if (!isToday && !isTomorrow) {
        response.response.text = 'Я могу говорить запись только на сегодня или на завтра';
        response.response.end_session = true;
        return res.send(response);
    }

    let data = [];

    try {
        data = await SalonService.loadEvents(isToday)
    } catch (e) {
        response.response.text = 'Произошла ошибка при запросе данных из салона'
        response.response.end_session = true;
        return res.send(response);
    }

    const events = EventsTransformer.transformIntoView(data.events);
    let eventsText = ''
    events.forEach(event => eventsText += EventsTransformer.getEventText(event));

    if (events.length) response.response.text = eventsText;
    else response.response.text = 'На выбранную дату никто не записался, можете отдохнуть';
    response.response.end_session = true;
    res.send(response)
}


const express = require('express')
const SalonService = require('./services/Salon')
const {config} = require('dotenv')
const {getDefaultResponse,EventsTransformer} = require('./helpers')
config()

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.post('/', async (req, res) => {
    const {version, session, request} = req.body
    const userCommand = request.command.toLowerCase();
    const forceToday = userCommand.includes('сегодня');
    const step = session.message_id;
    const response = {
        version,
        session,
        response: {
            end_session: false,
        }
    }

    let responseText = ''
    let data = [];
    try {
        data = await SalonService.loadEvents(forceToday)
    } catch (e) {
        response.response.text = 'Произошла ошибка при запросе данных из салона'
        response.response.end_session = true;
        return res.send(response);
    }

    const events = EventsTransformer.transformIntoView(data.events);
    events.forEach(event => responseText += EventsTransformer.getEventText(event));

    if (session.new) {
        response.response.text = 'Я умею находить записи на сегодня и на завтра, на какой день вам показать?';
        return res.send(response);
    }

    //Only for first step
    if (step === 1) {
        if (events.length) {
            response.response.text = `Запись на ${forceToday ? 'сегодня' : 'завтра'}:` + responseText;
            response.response.end_session = true;
        } else {
            response.response.text = `На ${forceToday ? 'сегодня' : 'завтра'} никто не записался, можете отдохнуть`;
            response.response.end_session = true;
        }
    }

    //Only for second step
    if (step === 2) {
    }

    res.send(response)
})
app.post('/today', async (req, res) => {
    const response = getDefaultResponse(req.body);

    let data = [];
    try {
        data = await SalonService.loadEvents(true)
    } catch (e) {
        response.response.text = 'Произошла ошибка при запросе данных из салона'
        response.response.end_session = true;
        return res.send(response);
    }

    const events = EventsTransformer.transformIntoView(data.events);
    let eventsText = ''
    events.forEach(event => eventsText += EventsTransformer.getEventText(event));

    if (events.length) response.response.text = 'Запись на сегодня: ' + eventsText;
    else response.response.text = 'На сегодня никто не записался, можете отдохнуть';

    response.response.end_session = true;
    res.send(response)
})
app.post('/tomorrow', async (req, res) => {
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

    if (events.length) response.response.text = 'Запись на завтра: ' + eventsText;
    else response.response.text = 'На завтра никто не записался, можете отдохнуть';

    response.response.end_session = true;
    res.send(response)
})

module.exports = app
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

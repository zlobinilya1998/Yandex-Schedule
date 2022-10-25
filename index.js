const express = require('express')
const SalonService = require('./services/Salon')
const {config} = require('dotenv')
const {getDefaultResponse,EventsTransformer} = require('./helpers')
config()

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))


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

    if (events.length) response.response.text = eventsText;
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

    if (events.length) response.response.text = eventsText;
    else response.response.text = 'На завтра никто не записался, можете отдохнуть';

    response.response.end_session = true;
    res.send(response)
})

app.post('/specific', async (req, res) => {
    const response = getDefaultResponse(req.body);
    response.response.text = 'Выбранный день';
    response.response.end_session = true;
    res.send(response)
})


module.exports = app
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

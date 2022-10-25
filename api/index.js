import {config} from 'dotenv'
import express from 'express'
import SalonService from "../services/Salon.js";
import {EventsTransformer} from "../helpers.js";

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

    console.log(request)
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
    if (step === 1){
        if (events.length){
            response.response.text = `Запись на ${forceToday ? 'сегодня' : 'завтра'}:` + responseText;
            response.response.end_session = true;
        } else {
            response.response.text = `На ${forceToday ? 'сегодня' : 'завтра'} никто не записался, можете отдохнуть`;
            response.response.end_session = true;
        }
    }

    //Only for second step
    if (step === 2){
    }

    res.send(response)
})
app.post('/test', async (req, res) => {
    try {
        let responseText = ''
        const data = await SalonService.loadEvents(true)
        const events = EventsTransformer.transformIntoView(data.events);

        events.forEach(event => responseText += EventsTransformer.getEventText(event));

        return res.send({events,responseText});
    } catch (e) {
        console.log(e)
        res.send(e)
    }
})



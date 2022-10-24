import {config} from 'dotenv'
import express from 'express'
import SalonService from "./services/Salon.js";
import {EventsTransformer} from "./helpers.js";

config()

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.post('/', async (req, res) => {
    const {version, session, request} = req.body
    const userCommand = request.command.toLowerCase();
    const forceToday = userCommand.includes('сегодня');
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

    if (!events.length) {
        response.response.text = `На ${forceToday ? 'сегодня' : 'завтра'} никто не записался, можете отдохнуть`;
        response.response.end_session = true;
    } else {
        response.response.text = `Запись на ${forceToday ? 'сегодня' : 'завтра'} - это ` + responseText;
        response.response.end_session = true;
    }

    res.send(response)
})
app.post('/test', async (req, res) => {
    try {
        const data = await SalonService.loadEvents()
        const events = EventsTransformer.transformIntoView(data.events);
        return res.send(events);
    } catch (e) {
        console.log(e)
        res.send(e)
    }
})


app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

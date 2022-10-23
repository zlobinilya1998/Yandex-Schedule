import axios from 'axios'
import {config} from 'dotenv'
import express from 'express'


const PORT = process.env.PORT || 3000
config()
const app = express()


const getEvents = async () => {
    const today = new Date().toLocaleString().split(',')[0];
    let tommorow = new Date()
    tommorow.setDate(tommorow.getDate() + 1);
    tommorow = tommorow.toLocaleString().split(',')[0]

    const api_url = 'https://profsalon.org/CRM/msc_persona_malaya_nikitskaya/desktop/loadScheduleEvents';
    const cookies = "PHPSESSID=aid0n4viav3ke9dd377946kpb0;_ym_uid=1666536337347538161;_ym_d=1666536337;_ym_isad=2"
    const { data } = await axios.post(api_url, {
        day: tommorow,
    }, {
        headers: {
            Cookie: cookies,
        },
    })
    return data;
}

app.use(express.json())
app.use(
    express.urlencoded({
        extended: true
    })
)


app.post('/', async (req, res) => {
    const {version, session, request} = req.body
    const userCommand = request?.command?.toLowerCase();
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
        data = await getEvents();
    } catch (e) {
        console.log(e)
        response.response.text = 'Произошла ошибка при запросе данных из салона'
        response.response.end_session = true;
        res.send(response)
    }

    console.log(data)

    let events = data.events.filter(event => event.id).map(event => ({
        ...event,
        start: new Date(event.start)
    })).sort((a, b) => a.start - b.start)

    events.forEach(event => {
        responseText += ', в ' + event.start.getHours() + ' часов: ' + event.name
    })

    if (session.new) {
        response.response.text = 'Я умею находить записи на сегодня и на завтра, на какой день вам показать?';
        res.send(response);
    }

    if (!events.length) {
        response.response.text = 'На указанный период никто не записался, можете отдохнуть';
        response.response.end_session = true;
    } else {
        response.response.text = 'Запись на завтра - это ' + responseText;
        response.response.end_session = true;
    }

    res.send(response)
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


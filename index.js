import axios from 'axios'
import {config} from 'dotenv'
import express from 'express'


const PORT = process.env.PORT || 3000
config()
const app = express()

app.use(express.json())
app.use(
    express.urlencoded({
        extended: true
    })
)

const cookies = "PHPSESSID=aid0n4viav3ke9dd377946kpb0;_ym_uid=1666536337347538161;_ym_d=1666536337;_ym_isad=2"

app.post('/', async (req, res) => {
    let responseText = ''
    const { data } = await axios.post('https://profsalon.org/CRM/msc_persona_malaya_nikitskaya/desktop/loadScheduleEvents', {
        day: "22.10.2022",
    }, {
        headers: {
            Cookie: cookies,
        },
    })

    let events = data.events.filter(event => event.id).map(event => ({
        ...event,
        start: new Date(event.start)
    })).sort((a,b) => a.start - b.start)


    events.forEach(event => {
        responseText += event.name + ', в ' + event.start.getHours() + ' часов '
    })

    const {version, session, request} = req.body

    console.log(responseText)
    // const userCommand = request.command;
    // const response = {
    //     version,
    //     session,
    //     response: {
    //         end_session: false,
    //     }
    // }
    //
    // if (session.new) response.response.text = 'На какой день показать запись?'
    // else if (!events.length){
    //     response.response.text = 'На указанный период никто не записался';
    //     response.response.end_session = true;
    // }
    // else {
    //     response.response.text = 'Запись на завтра - это ' + responseText;
    //     response.response.end_session = true;
    // }
    //
    // res.send(response)
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


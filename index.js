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

app.post('/', async (req, res) => {
    const {version, session} = req.body

    const response = {
        version,
        session,
        response: {
            end_session: false,
        }
    }
    console.log(req.body)

    if (session.new) response.response.text = 'За какой день показать запись?'
    else {
        response.response.text = 'Запись на завтра - это';
        response.response.end_session = true;
    }

    res.send(response)
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


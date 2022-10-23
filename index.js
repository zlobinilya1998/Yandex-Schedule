import axios from 'axios'
import { config } from 'dotenv'
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
    console.log(req.body)
    res.send('Done')
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


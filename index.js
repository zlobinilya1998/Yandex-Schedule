import express from 'express'
import record from './api/record.js'

const app = express();
const port = 3000;

app.post('test', (req,res) => record(req,res))


app.listen(port, () => {
    console.log('app listening on port ',port)
})

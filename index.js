import express from 'express'
import record from './api/record.js'
import specific from "./api/specific.js";
import {config} from "dotenv";
import {authChecker, logger} from "./middleware/index.js";

config()

const app = express();
app.use(logger);
app.use(authChecker);
const port = 3000;
app.use(express.json())
app.post('/record', (req,res) => record(req, res))
app.post('/specific', (req,res) => specific(req, res))



app.listen(port, () => console.log('app listening on port ',port))


export default app;

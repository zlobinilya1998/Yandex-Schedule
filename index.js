import express from 'express'
import record from './api/record.js'
import specific from "./api/specific.js";
import {authChecker, errorHandler, logger} from "./middleware/index.js";

const port = 3000;
const app = express();
app.use(express.json())
app.use(logger);
app.use(authChecker);
app.post('/record', (req,res, next) => record(req, res, next))
app.post('/specific', (req,res,next) => specific(req, res, next))
app.use(errorHandler);
app.listen(port, () => console.log('app listening on port ',port))


export default app;

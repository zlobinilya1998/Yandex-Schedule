import express from 'express'
import router from "./routes/index.js";
import {errorHandler, logger} from "./middleware/index.js";

const port = 3000;
const app = express();



app.use(express.json())
app.use(logger);
app.use(router);
app.use(errorHandler);
app.listen(port, () => console.log('App booted on port:', port))

export default app;

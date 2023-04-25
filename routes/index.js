import {Router} from "express";
import specific from "../api/specific.js";
import record from "../api/record.js";
import {authChecker} from "../middleware/index.js";
import {body} from "express-validator";

const router = Router();

router.use(authChecker);
router.post('/record', (req, res, next) => record(req, res, next))
router.post('/specific', body().notEmpty(),(req, res, next) => {
    return specific(req, res, next)
})


export default router;

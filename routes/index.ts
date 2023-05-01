import {Router} from "express";
import specific from "../api/specific";
import record from "../api/record";
import {authChecker} from "../middleware";
import {body} from "express-validator";

const router = Router();

router.use(authChecker);
router.post('/record', (req, res, next) => record(req, res, next))
router.post('/specific', body().notEmpty(),(req, res, next) => {
    return specific(req, res, next)
})


export default router;

import {Router} from "express";
import specific from "../api/specific.js";
import record from "../api/record.js";
import {authChecker} from "../middleware/index.js";

const router = Router();

router.use(authChecker);
router.post('/record', (req, res, next) => record(req, res, next))
router.post('/specific', (req, res, next) => specific(req, res, next))


export default router;

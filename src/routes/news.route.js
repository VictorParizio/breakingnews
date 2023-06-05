import { Router } from 'express'
import { create, findAll, topNew } from "../controllers/news.controller.js"
import {authMiddleware} from "../middleware/auth.middleware.js"

const router = Router()

router.post("/", authMiddleware, create)
router.get("/", findAll)
router.get("/top", topNew)

export default router
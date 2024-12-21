
import { Router } from 'express'
import { verifyJWT } from '../middlewares/auth.middleware.js'
import { GetweatherInfo } from '../controllers/weather.controller.js'


const router = Router()

router.route("/:location").get(verifyJWT ,GetweatherInfo)


export{
    router
}
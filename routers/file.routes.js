import { Router } from "express"
import {upload} from "../middlewares/multer.middleware.js"
import { Uploadfile } from "../controllers/file.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"


const router = Router()
router.route("/uploadfile").post(
    upload.fields([
        {
            name: "file",
            maxCount: 1
        }  
    ]),
    verifyJWT, Uploadfile
    )



export{
    router
}
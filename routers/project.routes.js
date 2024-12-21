import { Router } from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { CreateProject,GetProject, DeleteProject, UpdateProject } from "../controllers/project.controller.js"


const router = Router()

router.route("/createproject").post(verifyJWT, CreateProject)
router.route("/getproject").get(verifyJWT, GetProject)
router.route("/updateproject").put(verifyJWT, UpdateProject)
router.route("/deleteproject").delete(verifyJWT, DeleteProject)

export{
   router
}

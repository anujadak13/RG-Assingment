import express, { urlencoded } from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app =express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from './routes/user.routes.js'
import projectRouter from './routes/user.routes.js'
import fileuploadRouter from './routes/user.routes.js'
import weatherRouter from './routes/user.routes.js'


app.use("/api/v1/users", userRouter)
app.use("/api/v1/projects", projectRouter)
app.use("/api/v1/files", fileuploadRouterRouter)
app.use("/api/v1/wather", weatherRouter)


export{app}






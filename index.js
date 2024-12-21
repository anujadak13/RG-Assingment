import dotenv from "dotenv";
import connectDB from "./db/index.js";
import {app} from './app.js';
import bodyParser from "body-parser"

dotenv.config({
    path: './.env'
})


connectDB()
.then(()=>{
    app.on("Error", (error)=>{
    console.log("Error found")
             })

   app.listen(process.env.PORT || 800, ()=>{
    console.log(`Server is running at PORT: ${process.env.PORT}`)
   })
})
.catch( (error)=>{
console.log(`Database Connection Failed`, error)
})





import express from 'express'
import notesRouter from "./routes/notesRoutes.js" 
import dotenv from "dotenv"
import{connectDB} from "./config/DB.js"
import cors from "cors"
dotenv.config()
const app= express()
app.use(cors({origin: ["http://localhost:5173", "https://bright-babka-132835.netlify.app"]})) // Habilitar CORS para todas las rutas
app.use(express.json()) // Middleware para parsear JSON en las solicitudes
app.use("/api/notas", notesRouter)
//probandi el status git
const PORT=process.env.PORT || 3000
console.log("solo para actuqlizar el status del git")
console.log(process.env.PORT)
connectDB()
.then(() => {

    app.listen(PORT,()=>{
        console.log(`Server is running on http://localhost:${PORT}`)
    })
})




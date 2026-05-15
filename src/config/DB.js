import mongoose from "mongoose"
import dns from "dns"

dns.setServers(["8.8.8.8", "1.1.1.1"])

export const connectDB=async()=>{
    try {
        const dbURI=process.env.MONGODB_URI
        console.log("Connecting to MongoDB...")
        const conn = await mongoose.connect(dbURI)
        console.log(`Connected to MongoDB: ${conn.connection.host}`)

    } catch (error){
        console.error("Error connecting to MongoDB:", error)
        process.exit(1) // Salir del proceso con un código de error
    }

}
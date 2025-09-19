import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoutes.js'
import imageRouter from './routes/imageRoutes.js'
import path from "path";
import { fileURLToPath } from "url";



const PORT = process.env.PORT ||  4000 ;
const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const __dirname = path.resolve();

app.use(express.json())
app.use(cors())
await connectDB()

app.use('/api/user',userRouter)
app.use('/api/image', imageRouter)

// app.get('/',(req,res)=> res.send("API Working"))

app.use(express.static(path.join(__dirname,"..","/client/dist")))
app.get(/.*/,(_,res)=>{
    res.sendFile(path.resolve(__dirname,"client","dist","index.html"))
});

app.listen(PORT , ()=> console.log('Server running on port ' + PORT ));



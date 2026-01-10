import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/ratelimiter.js";



dotenv.config();

const app = express();
const PORT  = process.env.PORT || 5001;


//middleware
app.use(cors({
    origin: 'http://localhost:5173',
}));
app.use(express.json()); // this middleware will parse JSON bodies : req.body
app.use(rateLimiter);


// our simple custom middleware
// app.use((req,res,next)=>{
//     console.log(`${req.method} request for ${req.url}`);
//     next();
// });

app.use("/api/notes",notesRoutes);
 
connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("Server started on PORT:", PORT);
    });
});

// mongodb+srv://piyushprakash160604_db_user:nzpWSl3T3uAJWEkR@cluster0.bjzehmf.mongodb.net/?appName=Cluster0
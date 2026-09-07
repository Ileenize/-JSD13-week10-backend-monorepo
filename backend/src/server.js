import express from "express";
import { users } from "./fakeDB/fakeUser.js";
import { router as apiRoutes } from "./routes/index.js";
import { connectDB } from "./config/db.js";
//สร้างแอปพลิเคชัน
const app = express();

//แปลภาษา เผื่อมีการส้่งข้อมูล Json มา
app.use(express.json());

//CRUD routes and endpoints

app.use("/api", apiRoutes);


app.use((err, req, res, next)=>{
    return res.status(500).json({
        error: "Something went wrong on the server...",
        message: err.message,
    });
});

const PORT = 3001;

    async function start() {
        try{
            await connectDB();

            app.listen(PORT, () => {
            console.log(`Server running on PORT:${PORT} 🟢`);
            });
        } catch(err){
            console.error("Failed to connect to MongoDB:", err.message)
            process.exit(1);
        }
    }

start();


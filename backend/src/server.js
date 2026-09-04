import express from "express";
import { users } from "./fakeDB/fakeUser.js";
//สร้างแอปพลิเคชัน
const app = express();
//แปลภาษา เผื่อมีการส้่งข้อมูล Json มา
app.use(express.json());

//CRUD routes and endpoints

//Read Users
app.get("/users", (req,res) => {
    try{
        console.log(req); //console.log(req.body);
        res.json(users);
    }catch(err){
        next(err)
    }
});

//Create User
app.post("/users", (req,res) => {
    try{
        const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({error: "username, email and password are required!"});
    }

    const highestID = users.reduce(
        (max, u) => Math.max(max, Number(u.id) || 0),
        0
    );

    const nextId = String(highestID + 1);
    const newUser = {
        id: nextId,
        username: username,
        email: email,
        password: password,
    };

    users.push(newUser);

    return res.status(201).json(newUser);

    }catch(error){
     next(err); 
    }

})

//Update User
app.put("/users/:id", (req,res) => {
    try{
    const user = users.find((u) => u.id === req.params.id)
    if(!user){
        return res.status(404).json({error: "User not found!"});
    }
    const { username, email, password } =req.body;
    if(!username || !email || !password){
        return res.status(400).json({error: "Username, email and password are required1"});
    }
    user.username = username;
    user.email = email;
    user.password = password;

    return res.status(200).json(user);
    }catch(error){
     next(err); 
    }
});

//Delete User
app.delete("/users/:id", (req,res) => {
    try{
     const index = users.findIndex((u)=>u.id === req.params.id)

     if(index === -1){
        return res.status(404).json({error: "User not found!"})
     }
     const [deleted] = users.splice(indexedDB,1)
     return res.json(deleted)
    }catch(error){
     next(err);   
    }
    const {id} = req.params;
});
app.use((err, req, res, next)=>{
    return res.status(500).json({
        error: "Something went wrong on the server...",
        message: err.message,
    });
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server running on PORT:${PORT} 🟢`);
});
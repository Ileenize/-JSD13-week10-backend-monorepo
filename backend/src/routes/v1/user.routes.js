import { Router } from "express";
import {users} from "../../fakeDB/fakeUser.js";


export const router = Router();

//Read Users
router.get("/users", (req,res,next) => {
    try{
        //console.log(req); //console.log(req.body);
        res.json(users);
    }catch(err){
        next(err);
    }
});

//Create User
router.post("/users", (req,res,next) => {
    try{
        const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            error: "username, email and password are required!"});
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
     next(error); 
    }

})

//Update User
router.put("/users/:id", (req,res,next) => {
    try{
    const user = users.find((u) => u.id === req.params.id)
    if(!user){
        return res.status(404).json({error: "User not found!"});
    }
    const { username, email, password } =req.body;
    if(!username || !email || !password){
        return res.status(400).json({error: "Username, email and password are required!"});
    }
    user.username = username;
    user.email = email;
    user.password = password;

    return res.status(200).json(user);
    }catch(error){
     next(error); 
    }
});

//Delete User
router.delete("/users/:id", (req,res,next) => {
    try{
     const {id} = req.params;
     const index = users.findIndex((u)=>u.id === id);

     if(index === -1){
        return res.status(404).json({error: "User not found!"})
     }
     const [deleted] = users.splice(index,1)
     return res.json(deleted)
    }catch(error){
     next(error);   
    }
});
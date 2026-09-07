import { Router } from "express";
import {users} from "../../fakeDB/fakeUser.js";
import { User } from "../../models/user.model.js";

export const router = Router();

//Read Users
router.get(["/", "/users"], async (req, res, next) => {
    try {
        //1.get users data from database
        const users = await User.find();
        //2.send response object
        return res.json(users);
    } catch (err) {
        next(err);
    }
});

//Create User
router.post(["/", "/users"], async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: "username, email and password are required." });
        }

        const newUser = await User.create({ username, email, password });

        const { password: _password, ...userWithoutPassword } = newUser.toObject();

        return res.status(201).json(userWithoutPassword);

    } catch (error) {
        next(error); 
    }
});

//Update User
router.put(["/:id", "/users/:id"], async (req, res, next) => {
    try {
        const { id } = req.params;
        const { username, email, password } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { username, email, password },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found!" });
        }
        const { password: _password, ...userWithoutPassword } = updatedUser.toObject();
        return res.status(200).json(userWithoutPassword);
    } catch (error) {
        next(error); 
    }
});

//Delete User
router.delete(["/:id", "/users/:id"], async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ error: "User not found!" });
        }
        return res.json(deletedUser);
    } catch (error) {
        next(error);   
    }
});
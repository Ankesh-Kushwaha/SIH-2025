import { Schools } from "../model/Schema";
import express from "express";
const router = express.Router();

router.post("/register", async (req, res) =>{
    try {
        const { name, address } = req.body;
        const newSchool = new Schools({ name, address });
        await newSchool.save();
        res.status(201).json({ message: "School registered successfully", school: newSchool });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})
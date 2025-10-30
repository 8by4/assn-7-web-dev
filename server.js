"use strict";
import express from "express";
import multer from "multer";

const app = express();

app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log('Jokebook app listening on port: ' + PORT + "!");
});

import pool from './database/pool.js'

//endpoints
app.get("/hello", function (req, res) {
    res.type("text");
    res.send("Hello from /hello! ");
});

app.get("/jokebook/categories", async function (req, res) {
    try {
        const result = await pool.query("SELECT name FROM public.categories");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database query failed" });
    }
});

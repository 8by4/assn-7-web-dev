"use strict";
const express = require("express");
const app = express();

const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log('Jokebook app listening on port: ' + PORT + "!");
});


app.get("/hello", function (req, res) {
    res.type("text");
    res.send("Hello from /hello! ");
});

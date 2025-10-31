"use strict";
const model = require('../models/jokeModel');

async function fetchAllCategories(req, res) {
    try {
        const categories = await model.getAllCategories();
        res.json(categories);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}

async function fetchAllJokesIn(req, res) {
    try {
        const categoryName = req.params.name;
        const limit = parseInt(req.query.limit); 
        const jokes = await model.getAllJokesIn(categoryName, limit);
        
        res.json(jokes);
    } catch (err) {
        console.error(err);
        res.status(500).send("Category not found!");
    }
}

async function fetchRandomJoke(req, res) {
    try {
        const joke = await model.getRandomJoke();
        res.json(joke);
    } catch (err) {
        console.error(err);
        res.status(500).send("No jokes found");
    }
}
async function createJoke(req, res) {
    const { category_name, setup, delivery} = req.body;
    if (category_name && setup && delivery) {
        try {
            const newJoke = await model.addJoke(category_name, setup, delivery);
            res.status(201).json(newJoke);
        } catch (err) {
            console.error(err);
            res.status(500).send("Invalid Format");
        }
    } else {
        res.status(400).send("Missing required joke fields!");
    }
}

module.exports = {
    fetchAllCategories,
    fetchAllJokesIn,
    fetchRandomJoke,
    createJoke
};
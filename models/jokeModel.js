"use strict";
const pool = require('../models/db');

async function getAllCategories(){
    const queryText = "SELECT * FROM categories";

    const result = await pool.query(queryText);
    return result.rows
}

async function getAllJokesIn(name, limit){
    
    console.log("Searching for category:", name);

    let queryText = 
        "SELECT jokes.* FROM jokes JOIN categories ON jokes.category_id = categories.id WHERE categories.name = $1 ";
    

    const values = [name];

    if(limit !== undefined && Number.isInteger(limit) && limit > 0){
        queryText += "LIMIT $2";
        values.push(limit);
    }
    const result = await pool.query(queryText, values);
    return result.rows
}

async function getRandomJoke(){
    const queryText = "SELECT jokes.* FROM jokes JOIN categories ON jokes.category_id = categories.id ORDER BY RANDOM() LIMIT 1";
    const result = await pool.query(queryText);
    
    return result.rows[0];
}

module.exports = {
    getAllCategories,
    getAllJokesIn,
    getRandomJoke
};
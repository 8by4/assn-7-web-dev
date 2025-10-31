"use strict";
const pool = require('../models/db');

async function getAllCategories() {
    const queryText = "SELECT * FROM categories";

    const result = await pool.query(queryText);
    return result.rows
}

async function getAllJokesIn(name, limit) {

    console.log("Searching for category:", name);

    let queryText =
        "SELECT jokes.* FROM jokes JOIN categories ON jokes.category_id = categories.id WHERE categories.name = $1 ";


    const values = [name];

    if (limit !== undefined && Number.isInteger(limit) && limit > 0) {
        queryText += "LIMIT $2";
        values.push(limit);
    }
    const result = await pool.query(queryText, values);
    return result.rows
}

async function getRandomJoke() {
    const queryText = "SELECT jokes.* FROM jokes JOIN categories ON jokes.category_id = categories.id ORDER BY RANDOM() LIMIT 1";
    const result = await pool.query(queryText);

    return result.rows[0];
}

async function addJoke(category_name, setup, delivery) {
  const categoryRes = await pool.query("SELECT id FROM categories WHERE name = $1", [category_name])

  if (categoryRes.rows.length === 0){
    throw new Error(`Category "${category_name}" not found`)
  }
  const category_id = categoryRes.rows[0].id
  const queryText = "INSERT INTO jokes (category_id, category_name, setup, delivery) VALUES ($1, $2, $3, $4) RETURNING *"
  const values = [category_id, category_name, setup, delivery]
  const result = await pool.query(queryText, values)
  
  return result.rows[0]
}

module.exports = {
    getAllCategories,
    getAllJokesIn,
    getRandomJoke,
    addJoke
};
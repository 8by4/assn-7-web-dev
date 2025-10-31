let randomJokeContent = document.getElementById("joke");

const categoriesList = document.getElementById("categories_list");
const jokeList = document.getElementById("joke_list");
const categorySearch = document.getElementById("category_search");
const searchButton = document.getElementById("search");
const form = document.getElementById("form");


async function randomJoke(){
    try{
        const text = await fetch ("/jokebook/random");
        const joke = await text.json();
        randomJokeContent.textContent = `${joke.setup} - ${joke.delivery}`;
    }
    catch (err){
        randomJokeContent.textContent = "Joke not loaded.";
    }
};


async function displayCategories(){
    try{
        const text = await fetch ("/jokebook/categories");
        const categories = await text.json();

        console.log(categories);

        categoriesList.innerHTML = "";
        categories.forEach(i => {
            const li = document.createElement("li");
            li.textContent = i.name;
            li.addEventListener("click", () => getJokes(i.name));
            categoriesList.appendChild(li);
        });

    }catch (err){
        console.log(err);
    }
}

async function getJokes(categoryName){
    try{
        const text = await fetch (`/jokebook/categories/${categoryName}`);
        const jokes = await text.json();

        console.log(jokes);

        jokeList.innerHTML = "";
        jokes.forEach(i => {
            const li = document.createElement("li");

            li.textContent = `${i.setup} - ${i.delivery}`;
            jokeList.appendChild(li);
        });
    }catch (err){
        console.log(err);
    }
};

searchButton.addEventListener ("click", () => {
    const cat = categorySearch.value.trim();
    if(cat){
        getJokes(cat);
    }
});

form.addEventListener("submit", async (i) => {
    i.preventDefault();

    const formInfo = new FormData(form);
    const info = Object.fromEntries(formInfo);

    try{
        const text = await fetch ("/jokebook", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(info)
        });

        const jokes = await text.json();

        getJokes(info.category_name);
        form.reset();


    }catch (err){
        console.log(err);  
    }
});



randomJoke();
displayCategories();
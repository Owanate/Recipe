let searchResultDiv = document.querySelector(".search-result");
let searchQuery = document.querySelector("input");
const apiKey = "8dd45855b060473c83dc54dc67fb2869";
let search = document.getElementById("search-btn");
let viewBtn = document.getElementById("view-btn");
let mealDetailsContent = document.querySelector(".meal-content-body");
let recipeCloseBtn = document.querySelector(".recipe-close-btn");

async function fetchAPI(e) {
    e.preventDefault();
    const url = `https://api.spoonacular.com/food/search?query=${searchQuery.value}&apiKey=${apiKey}&number=6`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    if(searchResultDiv.children){
        searchResultDiv.innerHTML = '';
    }
  
    for(let i = 0; i < 6; i++){
        let id = `${data.searchResults[0].results[i].id}`;
        let recipe =
            `<div class="cards" id =${id}>
              <img src="${data.searchResults[0].results[i].image}" alt="food-image">
              <h2 class="title">${data.searchResults[0].results[i].name}</h2>
              <a class="view-btn" target="_blank">View Recipe</a>
            </div>`
            searchResultDiv.insertAdjacentHTML("afterbegin", recipe);
    }
}

search.addEventListener("click", fetchAPI);
searchQuery.addEventListener("keyup", (e) => {
    if(e.key == "Enter"){
        fetchAPI(e)
        searchQuery.value = "";
    }
})

document.querySelector(".view-btn").addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});

function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('view-btn')){
        let list = e.target.parentElement;
        fetch(`https://api.spoonacular.com/recipes/${list.id}/information?apiKey=${apiKey}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data));
    }
}
  
  function mealRecipeModal(data){
    let html =
        `<h2 class="recipe-title"> ${data.title} </h2>
        <div class="flex-container">
          <div class="icons">
            <i class='bx bxs-time' style='color:#645cff'></i>
            <p>PrepTime</p>
            <p>${data.readyInMinutes}</p>
          </div>
          <div class="icons">
            <i class='bx bxs-badge-check' style='color:#645cff'></i>
            <p>Health Score</p>
            <p>${data.healthScore}</p>
          </div>
          <div class="icons">
            <i class='bx bx-group' style='color:#645cff'></i>
            <p>Serving</p>
            <p>${data.servings}</p>
          </div>
         </div>
         <p>Wine Pairings: ${data.winePairing.pairingText}</p>
         <a class="recipe-link" href=${data.sourceUrl}>Get the full Recipe</a>
        </div>`
        mealDetailsContent.innerHTML = html;
        mealDetailsContent.parentElement.classList.add('showRecipe');
}
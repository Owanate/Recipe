let searchResultDiv = document.querySelector(".search-result");
let searchQuery = document.querySelector("input");
const apiKey = "8dd45855b060473c83dc54dc67fb2869";
let search = document.getElementById("search-btn");
let mealDetailsContent = document.querySelector(".meal-content");

async function fetchAPI(e) {
  e.preventDefault();
  const url = `https://api.spoonacular.com/food/search?query=${searchQuery.value}&apiKey=${apiKey}&number=6`;
  const response = await fetch(url);
  const data = await response.json();

  if (searchResultDiv.children) {
    searchResultDiv.innerHTML = "";
  }

  for (let i = 0; i < 6; i++) {
    let id = `${data.searchResults[0].results[i].id}`;
    let recipe = `<a class="meal-cards" href="#${id}" onclick="getMealRecipe(this)"><div class="cards" id =${id}>
              <img src="${data.searchResults[0].results[i].image}" alt="food-image">
              <h2 class="title">${data.searchResults[0].results[i].name}</h2>
            </div></a>`;
    searchResultDiv.insertAdjacentHTML("afterbegin", recipe);
  }
}

search.addEventListener("click", fetchAPI);
searchQuery.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    fetchAPI(e);
    searchQuery.value = "";
  } else {
    return false;
  }
});

function getMealRecipe(e) {
  let list = e.firstElementChild;
  fetch(
    `https://api.spoonacular.com/recipes/${list.id}/information?apiKey=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => mealRecipeModal(data))
    .then((e) => {
        document.querySelector(".recipe-close-btn").addEventListener("click", () => {
            mealDetailsContent.innerHTML = '';
        });
    })
}

function mealRecipeModal(data) {
  let html = `
        <div class="meal-content-body">
        <div class="modal-header">
            <a href="#" class = "recipe-close-btn">&times;</a>
            <h2 class="recipe-title">${data.title}</h2>
        </div>
        <div class="modal-body">
        <div class="flex-container">
          <div class="icons">
            <i class='bx bxs-time icon' style='color:#645cff'></i>
            <p class="mute">Prep Time</p>
            <p>${data.readyInMinutes}</p>
          </div>
          <div class="icons">
            <i class='bx bxs-badge-check icon' style='color:#645cff'></i>
            <p class="mute">Health Score</p>
            <p>${data.healthScore}</p>
          </div>
          <div class="icons">
            <i class='bx bx-group icon' style='color:#645cff'></i>
            <p class="mute">Serving</p>
            <p>${data.servings}</p>
          </div>
         </div>
         <p class="text">Ingredients:
         <ul id="ingredients">

         </ul>
         </p>
         <p><b class="text">Instructions:</b> ${data.instructions}</p>
        </div>
        </div>
        </div>
        `;
  mealDetailsContent.innerHTML = html;

  let arr = data.extendedIngredients;
    for(let i =0; i < arr.length; i++){
        let ul = document.querySelector('#ingredients');
        let li = document.createElement('li');
        if(ul.childElementCount < arr.length){
            li.innerText = `${arr[i].name}`;
            ul.append(li);
        } 
  }
}
let searchResultDiv = document.querySelector(".search-result");
let searchQuery = document.querySelector("input");
const apiKey = "8dd45855b060473c83dc54dc67fb2869";
let search = document.getElementById("search-btn");
let viewBtn = document.getElementById("view-btn");

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
        let id = `${data.searchResults[4].results[i].id}`;
        let recipe =
            `<div class="cards" id =${id}>
              <img src="${data.searchResults[4].results[i].image}" alt="food-image">
              <h2 class="title">${data.searchResults[4].results[i].name}</h2>
              <a class="view-btn" target="_blank" href="${data.searchResults[4].results[i].link}">View Recipe</a>
            </div>`
            searchResultDiv.insertAdjacentHTML("afterbegin", recipe);
    }
}

search.addEventListener("click", fetchAPI);
searchQuery.addEventListener("keyup", (e) => {
    if(e.key == "Enter"){
        fetchAPI()
    }
})
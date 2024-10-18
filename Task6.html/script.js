
let result = document.querySelector(".result");
let searchBtn = document.querySelector("#searchBtn");
let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

searchBtn.addEventListener("click", () => {
    let userInput = document.querySelector("#userInput").value;
    if (userInput.length == 0) {
        result.innerHTML = `<h3> Input Field Cannot Be Empty</h3>`;
    }
    else {
        fetch(url + userInput)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                let myMeal = data.meals[0];
                console.log(myMeal.strMealThumb);
                console.log(myMeal.strMeal);
                console.log(myMeal.strArea);
                console.log(myMeal.strInstructions);
                let count = 1;
                let ingredients = [];

                for (let i in myMeal) {
                    let ingredient = "";
                    let measure = "";
                    if (i.startsWith("strIngredient") && myMeal[i]) {
                        ingredient = myMeal[i];
                        measure = myMeal[`strMeasure` + count];
                        count += 1;
                        ingredients.push(`${measure} ${ingredient}`);
                    }

                }
                console.log(ingredients);
                result.innerHTML = `
                     <img src=${myMeal.strMealThumb} alt="dish image">
                     <div class="detail"> 
                         <h2> ${myMeal.strMeal}</h2>
                         <h4> ${myMeal.strArea}</h4>
                     </div>
                     <div class="ingredients">
                         
                     </div>
                     <div class="recipe">
                         <button class="hide">X</button>
                         <pre class="instruction">${myMeal.strInstructions}</pre>
                     </div>
                     <button class="show">View Recipe</button>
                 `;
                let ingredientCon = document.querySelector(".ingredients");
                let parent = document.createElement("ul");
                let recipe = document.querySelector(".recipe");
                let hide = document.querySelector(".hide");
                let show = document.querySelector(".show");

                ingredients.forEach((i) => {
                    let child = document.createElement("li");
                    child.innerText = i;
                    parent.appendChild(child);
                    ingredientCon.appendChild(parent);
                });

                hide.addEventListener("click", () => {
                    recipe.style.display = "none";
                });

                show.addEventListener("click", () => {
                    recipe.style.display = "block";
                });

            })
            .catch(() => {
                result.innerHTML = `Invalid Input`;
            })

    }

});
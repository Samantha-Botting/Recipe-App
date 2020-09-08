const API_KEY = "";


document.querySelector("#home-nav-search-form").addEventListener('submit', async event => {

  const ingredient = await document.forms[0].elements[0].value;

  await localStorage.setItem("ingredient", `${ingredient}`);
});

document.querySelector("#home-main-search-form").addEventListener('submit', async event => {

  const ingredient = await document.forms[1].elements[0].value;

  await localStorage.setItem("ingredient", `${ingredient}`);
});

async function resultsSearchBar() {
  const ingredient = await document.forms[0].elements[0].value;

  await localStorage.setItem("ingredient", `${ingredient}`);
};

async function loadResultsPage() {
  const ingredient = await localStorage.getItem("ingredient");

  displayRecipeCardByIngredient(ingredient);
}


async function displayRecipeCardByIngredient(ingredient) {
  if (!ingredient) {
    throw new Error("no provided ingredient");
  }

  const recipes = await getRecipeInfoByIngredient(ingredient);

  const subHeading = `
      <p>Recipe results for <em>"${ingredient}"</em>...</p>
      `;

  const recipeCard = await recipes.map(recipe => {
    return `
        <li class="recipe-card">
          <a class='recipe-img' href='${recipe.sourceUrl}'><img src="${recipe.image}" ></a>
          <a href="${recipe.sourceUrl}" class='title'><h3>${recipe.title}</h3></a>
          <p class='prep'><i class="fas fa-clock" style='color: #f44'></i> Prep: ${recipe.readyInMinutes}mins</p>
          <p class='serves'><i class="fas fa-utensils" style='color: #f44'></i> Serves: ${recipe.servings}</p>  
        </li>
      `;
  });

  const subHeadingDiv = document.querySelector("#sub-heading");
  subHeadingDiv.innerHTML = subHeading;

  const resultsDiv = document.querySelector("#results");
  resultsDiv.innerHTML = recipeCard.join("");
}


async function getRecipeInfoByIngredient(ingredient) {
  if (!ingredient) {
    throw new Error("Provide ingredient");
  }

  const recipeInfo = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?query=${ingredient}&addRecipeInformation=true&apiKey=${API_KEY}`
  );
  const recipe = await recipeInfo.json();

  return recipe.results;
}











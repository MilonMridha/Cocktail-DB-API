const loadCocktails = () => {
    const inputField = document.getElementById('input-field');
    const inputFieldText = inputField.value;

    inputField.value = '';
    if(inputFieldText == '' || !isNaN(inputFieldText)){
        alert('Enter String Name')
    }
    // LoadCocktails Data ---------------->
    else{
        toggleSpinner('block');
        const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputFieldText}`
    
        fetch(url)
        .then(res => res.json())
        .then(data => displayCocktails(data.drinks))
    }
}
// toggle spinner function-------------->
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}


//Display cocktail data in UI---------------->

const displayCocktails = cocktails => {
    const main = document.getElementById('main');
    main.innerHTML = '';
    if(!cocktails){
        alert('result not found')
        toggleSpinner('none')
    }
    else{
        cocktails.forEach(cocktail => {
            const div = document.createElement('div');
                div.classList.add('col-lg-4');
                div.classList.add('mt-3');
                div.innerHTML = `
                <div class="card" style="width: 18rem;">
          <img src="${cocktail.strDrinkThumb} " class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${cocktail.strDrink} </h5>
            <p class="card-text">${cocktail.strInstructions?.slice(0, 80)} </p>
            <a href="#" onclick="loadSeeDetails('${cocktail.idDrink}')" class="btn btn-primary">See Details</a>
          </div>
        </div>
                `
                main.appendChild(div);
                toggleSpinner('none');
            });
    }
    

}
// Load See Details------------->
const loadSeeDetails = drinkId => {
    const url = (`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`)
    toggleSpinner('block');
    fetch(url)
    .then(res => res.json())
    .then(data => displayDetails(data.drinks[0]))
}
// Display see details Div--------------->
const displayDetails = drink => {
   
    const drinkDiv = document.getElementById('drink');
    drinkDiv.innerHTML = '';
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="card" style="width: 18rem;">
      <img src="${drink.strDrinkThumb} " class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Name :${drink.strDrink} </h5>
        <h6 class="card-title">Cattegory :${drink.strCategory} </h6>
        <h6 class="card-title">Type :${drink.strAlcoholic}</h6>
        <h6 class="card-title">DrinkId :${drink.idDrink} </h6>
        <p class="card-text">${drink.strInstructions}</p>
        </div>
    </div>
    `
    drinkDiv.appendChild(div);
    toggleSpinner('none');
}


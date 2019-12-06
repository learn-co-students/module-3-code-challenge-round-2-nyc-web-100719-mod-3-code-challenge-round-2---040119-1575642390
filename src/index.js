document.addEventListener('DOMContentLoaded', (e) => {
  console.log('DOM fully loaded and parsed');

  //get all the beer from the api
  function getBeers(){
    fetch("http://localhost:3000/beers")
      .then(function(resp){
        // console.log(resp)
        return resp.json()
      })
      .then(function(data){
        // console.log(data)
        data.forEach(function(beer){
          displayBeers(beer)
        })
      })
  }
  getBeers()

  //get the beers to be displayed on the browser
  function displayBeers(beer){
    let beerUl = document.querySelector("#list-group")
    let beerLi = document.createElement("li")
    beerLi.addEventListener("click", function(e){
      // console.log("is the click handler worker?")
      let beerDiv = document.querySelector("#beer-detail")
      beerDiv.innerHTML = 
      `
        <h1>${beer.name}</h1>
        <img src="${beer.image_url}">
        <h3>${beer.tagline}</h3>
        <textarea>${beer.description}</textarea>
        <button id="edit-beer" class="btn btn-info">
        Save
        </button>
      `
    })
    beerLi.innerHTML = beer.name
    beerUl.append(beerLi)
  }

  // get the edited beer details to persist to api
  let beerDiv = document.querySelector("#beer-detail")
  beerDiv.addEventListener("click", function(e){
    console.log(e.target.id)
    if(e.target.id === "edit-beer"){
      fetch(`http://localhost:3000/beers/${id}`, {
        method: "PATCH",
        headers: 
        {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({description: ("textarea").value})
      })
    }
  })


}); 
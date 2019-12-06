
//get fetch to grab beer info from DB
function getBeers(){
    fetch(`http://localhost:3000/beers`)
    .then(function(resp){return resp.json()})
    .then(function(beerArray){
        beerArray.forEach(function(beer){
            createBeer(beer)
        })
        
    })
}
getBeers()

//create beer function that creates HTML that will display to DOM
function createBeer(beer){
    //append Li to Ul List Group
    let ulListGroup = document.getElementById("list-group")
    let beerLi = document.createElement("li")
    beerLi.className = "list-group-item" 
    beerLi.dataset.id = `${beer.id}`
    let beerName = beer.name
    beerLi.innerText = `${beerName}`

    ulListGroup.append(beerLi)
}


//add event listener on beer Li 
let beerUl = document.getElementById("list-group")
//event delegation to add event listener on parent Ul that will see which child is selected 
beerUl.addEventListener('click', function(e){
    fetch(`http://localhost:3000/beers/${e.target.dataset.id}`)
    .then(function(resp) {return resp.json()})
    .then(function(beer) {
        console.log(beer)
        let beerDetailDiv = document.getElementById("beer-detail")
        beerDetailDiv.innerHTML = `
        <h1>${beer.name}</h1>
        <img src=${beer.image_url}>
        <h3>${beer.tagline}</h3>
        <textarea>${beer.description}</textarea>
        <button id="edit-beer" class="btn btn-info">
        Save
        </button>
        `

        let saveButton = document.getElementById("edit-beer")
        saveButton.addEventListener('click', function(e){
            let textArea = document.getElementsByTagName("textarea")
            let updatedDescription = textArea[0].value
            let thisBeerId = beer.id
            console.log(beer.id)
            updateDescription(thisBeerId, updatedDescription)
        })
    })
    
})

//when user clicks save button, send patch fetch to update DB & DOm

function updateDescription(thisBeerId, updatedDescription){
    fetch(`http://localhost:3000/beers/${thisBeerId}`, {method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
        body: JSON.stringify ({
            description : updatedDescription
        })

    })
}


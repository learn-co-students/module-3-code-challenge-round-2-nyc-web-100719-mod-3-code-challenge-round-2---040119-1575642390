document.addEventListener('DOMContentLoaded', (event) => {

    function getBeers(){
        return fetch("http://localhost:3000/beers")
        .then(function(response){return response.json()
        })
        .then(function(beers){
            console.log(beers)
            beers.forEach(beerList)
        })
    }
    getBeers()

    let listGroup = document.getElementById("list-group")
    console.log(listGroup)

    function beerList(beer){
        let liBeer = document.createElement('li')
        liBeer.setAttribute("id", `${beer.id}`)
        liBeer.className = 'list-group-item'
        liBeer.innerHTML = `${beer.name}`
        listGroup.append(liBeer)
    }

    let beerDetail = document.getElementById("beer-detail")
    console.log(beerDetail)

    document.body.addEventListener("click", function (e){
        if(e.target.classList[0] === 'list-group-item'){
            getSingleBeer(e.target.id)
        }
    })

    function getSingleBeer(beerId){
        return fetch(`http://localhost:3000/beers/${beerId}`)
        .then(function(response){return response.json()
        })
        .then(function(beer){
            beerDetails(beer)
        })
    }

    function beerDetails(beer){
        beerDetail.innerHTML = `
        <h1 class='${beer.id}'>${beer.name}</h1>
        <img src="${beer.image_url}">
        <h3>${beer.tagline}</h3>
        <textarea id="description">${beer.description}</textarea>
        <button id="edit-beer" class="btn btn-info">
          Save
        </button>
        `
    } 
    
    function persistEdit(id, description){
        fetch(`http://localhost:3000/beers/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                description: description
            }),
            headers: { 
                'Content-Type': 'application/json',
                'accept': 'application/json'
            }
        })
    }

     beerDetail.addEventListener('click', function(e){
        if (e.target.classList[0] === 'btn'){
            let description = document.getElementById('description').value
            let id = document.getElementsByTagName("h1")[0].getAttribute("class")
            persistEdit(id, description)
        }
    })
    
});
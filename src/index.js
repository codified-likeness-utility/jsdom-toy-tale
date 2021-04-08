let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";

      const toyForm = document.querySelector('.add-toy-form')
      toyForm.addEventListener('submit', (e) => createNewToy(e))

    } else {
      toyFormContainer.style.display = "none";
    }

  });
  getToys();

  
});

function getToys() {
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(toys => {
    toys.forEach(toy => {
      renderToys(toy)
    })
  })
}

const renderToys = (toy) => {
  const toyCollection = document.getElementById("toy-collection")

    const toyDivCard = document.createElement('div')
      toyDivCard.className = 'card'
        // toyCollection.appendChild(toyDivCard)

      const toyName = document.createElement('h2')
        toyName.innerHTML = toy.name
          // toyDivCard.appendChild(toyName)

          const toyImg = document.createElement('img')
            toyImg.src = toy.image
              toyImg.className = 'toy-avatar'
              // toyDivCard.appendChild(toyImg)

              const toyLikes = document.createElement('p')
                toyLikes.innerText = toy.likes
                  // toyDivCard.appendChild(toyLikes)

                  const likeButton = document.createElement('button') //Increase toy likes
                    likeButton.innerText = "💖"
                      likeButton.className = 'like-btn'
                        likeButton.id = toy.id
                        likeButton.addEventListener('click', (e) => {
                            addLike(e)
                        })

  toyDivCard.append(toyName, toyImg, toyLikes, likeButton)
  toyCollection.append(toyDivCard)
}

const createNewToy = (e) => {
  e.preventDefault()

    const newToyName = e.target[0].value
      // console.log(e.target[0].value)

    const newToyImg = e.target[1].value
      // console.log(e.target[1].value)

    const newToy = {
      name: newToyName,
      image: newToyImg,
      likes: 0
    }

    fetch('http:localhost:3000/toys', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
          Accept: "application/json"
      },
      body: JSON.stringify(newToy)
    })
    .then(response => response.json())
    .then(newToy =>{

      const toyCollection = document.getElementById("toy-collection")
      toyCollection.innerHTML = ""

      getToys()
    })
}

function addLike(e){

  e.preventDefault()

  let num = parseInt(e.target.previousElementSibling.innerText)
  num = num + 1

  fetch(`http://localhost:3000/toys/${e.target.id}`, {
    method: 'PATCH',
    headers: {
      "content-type": "application/json",
      "active": "application/json"
    },
    body: JSON.stringify({
      likes: num
    })
  })
  .then(response => response.json())
  .then(increaseLikes => {
      // const toyCollection = document.getElementById("toy-collection")
      // toyCollection.innerHTML = ""
      e.target.previousElementSibling.innerText = `${num} 💖's`
      // getToys()
  })

}

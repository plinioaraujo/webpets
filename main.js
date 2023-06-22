const url = "https://learnwebcode.github.io/pet-adoption-data/pets.json"

const petPromise = await fetch(url)
const pets = await petPromise.json()
    
const template = document.querySelector("#animal-card-template")
const wrapper = document.createElement("div")
const decideAgeText = (age) => !age ? "Menos de um ano de idade" : (age > 1 ? `${age} anos de idade` : "Um ano de idade" ) 

pets.forEach(pet => {
    const clone = template.content.cloneNode(true)
    clone.querySelector("h3").textContent = pet.name

    const img = clone.querySelector("img")
    img.src = pet.photo
    img.alt = `A ${pet.species} named ${pet.name} `

    const age = new Date().getFullYear() - pet.birthYear
    const ageText = decideAgeText(age)
    clone.querySelector(".age").textContent = ageText

    clone.querySelector(".species").textContent = pet.species
    clone.querySelector(".description").textContent = pet.description

    clone.querySelector(".primary-btn").textContent = `Adote o ${pet.name}`
    clone.querySelector(".primary-btn").href = `https://learnwebcode.github.io/pet-adoption-data/pets/${pet.id}/`

    wrapper.appendChild(clone)
});

document.querySelector(".animals").appendChild(wrapper)


const filterButtons = document.querySelectorAll(".filter-nav a")
filterButtons.forEach(el => {
    el.addEventListener("click", e=> handlleFilterClick(e))
    
})

const handlleFilterClick = (e) =>{
    const target = e.target

    e.preventDefault()

    filterButtons.forEach(el => {
        el.classList.remove("active")
    })
    target.classList.add("active")

    filterPets(target.dataset.filter)
}

const filterPets = (species) => {
    const allPets = document.querySelectorAll(".animal-card")
    
    if(species === "all"){
        allPets.forEach(el => {
            el.style.display = ""
        })
    }else{
        allPets.forEach(el => {
            if(el.querySelector(".species").textContent === species){
                el.style.display = ""
            }else {
                el.style.display = "none"
            }
        })
    }

    console.log(allPets)
}
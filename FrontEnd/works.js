let worksData = []

fetch("http://localhost:5678/api/works")
.then(response => response.json())
.then(works =>{  
  worksData = works 
  displayWorks(works,".gallery") 
   getCategories(works)
 })
.catch(error => console.log(error))

function displayWorks(works,selector){
    const gallery = document.querySelector(selector)
    gallery.innerHTML=""
    works.forEach(work => {
    const figure=document.createElement("figure")
    const img=document.createElement("img")
    img.src=work.imageUrl
    img.alt=work.title
    figure.appendChild(img)
    const figcaption=document.createElement("figcaption")
    figcaption.textContent=work.title
    figure.appendChild(figcaption)
    gallery.appendChild(figure)
    });
}

function getCategories(works){
  fetch('http://localhost:5678/api/categories')
  .then(response => response.json())
  .then(categories => {
    filterCategory(categories,works)
    
  })
  .catch(error => console.error(error));
}



  function filterCategory(categories,works){
    const filtersContainer = document.getElementById('filters-container');
    filtersContainer.innerHTML=""
    const boutonTous= document.createElement("button");
    boutonTous.textContent="Tous"
    boutonTous.classList.add("active-button")
    boutonTous.onclick= () =>{
      activeBouton(boutonTous) 
      displayWorks(works,".gallery")
    };
    filtersContainer.appendChild(boutonTous)

    categories.forEach(category => {
     const boutton=document.createElement("button");
     boutton.textContent=category.name
     boutton.onclick=() =>{
      activeBouton(boutton)
      const filteredWorks=works.filter(work=> work.category.name=== category.name)
        displayWorks(filteredWorks, ".gallery")
     }
     filtersContainer.appendChild(boutton)
    });

  }

  function activeBouton(boutonToActive){
    document.querySelectorAll("#filters-container button").forEach(button=>{
      button.classList.remove("active-button")
    })
    boutonToActive.classList.add("active-button")
  }
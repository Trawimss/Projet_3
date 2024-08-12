document.addEventListener("DOMContentLoaded", () => {
    const loginLogout = document.getElementById("login-logout");
    const filterdiv = document.getElementById("filters-container");
    const banner = document.getElementById("banner");



    // Vérifie si l'utilisateur est authentifié
    if (sessionStorage.getItem("authToken")) {
        loginLogout.textContent = "logout";
        loginLogout.addEventListener("click", (e) => {
            e.preventDefault();
            sessionStorage.clear();
            window.location.replace("index.html")
        });
        filterdiv.style.display = "none";
    } else {
        banner.style.display = "none";
        editBoutonDiv.style.display = "none";
    }

});

// MODALE //
//open first modal //

document.addEventListener("DOMContentLoaded", function() {
    const openModale = function(e) {
        e.preventDefault();
        console.log('hello')
        const modal = document.getElementById("modale");
        modal.style.display = "flex";
        modal.setAttribute("aria-hidden", "false");
        modaleGallery(worksData)
    };
  
    const buttonModale = document.getElementById("editBouton");
    if (buttonModale) {
        buttonModale.addEventListener("click", openModale);
    } else {
        console.error("L'élément avec l'ID 'button-modale' n'a pas été trouvé.");
    }
    
  });

//close modal//

const buttonClose = document.getElementById("close-modale");
const modal = document.getElementById("modale");

function closeModale() {
    modal.style.display = "none";
  }
buttonClose.addEventListener("click", closeModale)

//display work in modale//  

function modaleGallery(works) {
    const galleryModale = document.querySelector(".modale-gallery");
    galleryModale.innerHTML = "";
  
    works.forEach((work) => {
        const modaleWork = document.createElement("figure");
        const modaleWorkImg = document.createElement("img");
        const deleteButton = document.createElement("button");
        const deleteIcon = document.createElement("i");
  
        modaleWorkImg.src = work.imageUrl;
        modaleWorkImg.alt = work.title;
        modaleWorkImg.className = "modaleWork-img"; 
        modaleWork.className = "modaleWork";
  
        deleteButton.className = "delete-button";
        deleteButton.dataset.id = work.id;
        deleteIcon.className = "fa-solid fa-trash-can"; 
  
        deleteButton.appendChild(deleteIcon); 
        modaleWork.appendChild(modaleWorkImg);
        modaleWork.appendChild(deleteButton); 
  
        galleryModale.appendChild(modaleWork);
  
         deleteButton.addEventListener('click', (event) => {
          event.preventDefault();
          const workId = deleteButton.dataset.id;
          deleteWorkById(workId);
    });
    } 
 )};

 //DELETE WORK in the modal//

function deleteWorkById(i) {
    let token = sessionStorage.getItem("authToken");
    fetch("http://localhost:5678/api/works/" + i, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (response.ok) {
        newWorks = worksData.filter((work) => work.id != i); // sort and delete work from the DOM
        displayWorks(newWorks,".gallery") // Display new works sorted in the main galery
        modaleGallery(newWorks); //dispplay works serted in first modal
      } else {
        alert("Erreur : " + response.status);
        closeModale;
      }
    });
  }
  
  //OPEN Add Modal//

const modale = document.getElementById('modale');
const modaleAdd = document.getElementById('modale-add');
const btnAdd = document.getElementById('add-picture');
const returnBtn = document.getElementById('return-btn');
const closeModale2Btn = document.getElementById('close-modale2');

// open modale add
function openModaleAdd() {
    modale.style.display = 'none'; 
    modaleAdd.style.display = 'flex'; 
}

// return
function returnToModale() {
    modale.style.display = 'flex'; 
    modaleAdd.style.display = 'none'; 
}

// close modale add
function closeModaleAdd() {
    modaleAdd.style.display = 'none'; 
}

// Event listeners
btnAdd.addEventListener('click', openModaleAdd);
returnBtn.addEventListener('click', returnToModale);
closeModale2Btn.addEventListener('click', closeModaleAdd);

//PHOTO PREVIEW//

const inputImage = document.getElementById("photo");
const labelImage = document.getElementById("photo-library");
const pImage = document.querySelector("#labelPhoto > p");
const iconeImage = document.querySelector("#pictureIcon");

inputImage.addEventListener("change", function () {
  const selectedImage = inputImage.files[0];

  const imgPreview = document.createElement("img");
  imgPreview.src = URL.createObjectURL(selectedImage);
  imgPreview.style.maxHeight = "220px";
  imgPreview.style.width = "auto";

  labelImage.style.display = "none";
  pImage.style.display = "none";
  inputImage.style.display = "none";
  iconeImage.style.display = "none";
  document.getElementById("labelPhoto").appendChild(imgPreview);
});

//category form//

const selectCategory = document.getElementById('selectCategory');

const reponseCategory = fetch('http://localhost:5678/api/categories')
.then((response) => response.json())
.then((data) => {
  data.forEach((category) => {
    const categoryOption = document.createElement('option')
    const categoryLabel = document.createElement('label')

    categoryOption.setAttribute('value', category.id)
    categoryLabel.innerHTML = category.name

    selectCategory.appendChild(categoryOption)
    categoryOption.appendChild(categoryLabel)
  });
});

const titleInput = document.getElementById('title');
const categorySelect = document.getElementById('selectCategory');
const imageInput = document.getElementById('photo');
const submitButton = document.getElementById('valider');

function formValidity() {
  if (titleInput.value !== '' && categorySelect.value !== '' && imageInput.value !== '') {
    submitButton.style.backgroundColor = '#1D6154';
  } else {
    submitButton.style.backgroundColor = '';
    }
  }

titleInput.addEventListener('input', formValidity);
categorySelect.addEventListener('change', formValidity);
imageInput.addEventListener('change', formValidity);

//ADD NEW WORK//

const btnValider = document.getElementById("valider");
btnValider.addEventListener("click", addNewWork);

function addNewWork(event) {
  event.preventDefault(); 

  const token = sessionStorage.getItem("authToken");

  const title = document.getElementById("title").value;
  const category = document.getElementById("selectCategory").value;
  const image = document.getElementById("photo").files[0];


  if(!title || !category || !image) {
    alert('Veuillez remplir tous les champs du formulaire.')
    return;
  }
  if (image.size > 4 * 1024 * 1024) {
    alert("La taille de l'image ne doit pas dépasser 4 Mo.");
    return;
  }
  
const formData = new FormData();
  formData.append("title", title);
  formData.append("category", category);
  formData.append("image", image);

sendNewData(token, formData, category)

//API call for new work//

// reset add form after work added //

function resetModalForm() {
        document.getElementById("title").value = ""; 
        document.getElementById("selectCategory").selectedIndex = 0; 
        document.getElementById("modale").style.display = "none"; 
        document.getElementById("photo").style.display = "none";
        document.getElementById("photo-library").style.display = "flex";
        document.querySelector("#labelPhoto > p").style.display = "flex";
        document.querySelector("#pictureIcon").style.display = "flex";
        // Supprimer l'image affichée
        const imgPreview = labelPhoto.querySelector("img");
        if (imgPreview) {
          imgPreview.remove();
        }
      }

      function sendNewData(token, formData, title, category) {
        fetch("http://localhost:5678/api/works", {
          method: "POST",
          headers: {
            authorization: `Bearer ${token}`,
          },
          body: formData,
        })
          .then((response) => {
            if (response.ok) {
              alert("Nouveau projet ajouté avec succès : ");
              return response.json();
            } else {
              console.error("Erreur:", response.status);
            }
          })
          .then ((data) => {
        
            updateWorks();
            resetModalForm();
          })
      
          .catch((error) => console.error("Erreur:", error));
      }}

function updateWorks(){
  fetch("http://localhost:5678/api/works")
  .then(response => response.json())
  .then(works => {
      displayWorks(works,".gallery");
      modaleGallery(works);
  })

}
document.addEventListener("DOMContentLoaded", () => {
    const loginLogout = document.getElementById("login-logout");
    const filterdiv = document.getElementById("filters-container");
    const banner = document.getElementById("banner");
    const modalDelete = document.getElementById("modalDelete");
    const editBouton = document.getElementById("editBouton");
    const editBoutonDiv = document.getElementById("editBoutonDiv");
    const photoGalleryModal = document.getElementById("photoGalleryModal");
    const modalContent = document.getElementById("modal-content")
    const addPhotoModal = document.getElementById("addPhotoModal");
    const modals = document.getElementById("modals");

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

    // Fonction pour charger la galerie dans la fenêtre modale avec les données des œuvres
   /* window.loadModalGallery = function(works) {
        photoGalleryModal.style.display = "flex";
        addPhotoModal.style.display = "none";
        modalDisplayWorks(works, ".gallery-modal", true); // Passe true pour indiquer que c'est un modal
    };

    // Écouteur d'événement pour afficher la fenêtre modale lorsque le bouton d'édition est cliqué
    editBouton.addEventListener("click", () => {
        modalDelete.style.display = "block";
        modals.style.display = "block";
        loadModalGallery(worksData); // Assure que worksData est défini et disponible
    });*/
});

// Fonction pour afficher les œuvres, avec option pour cacher les titres dans les modales
/*function modalDisplayWorks(works, selector, isModal = false) {
    const gallery = document.querySelector(selector);
    gallery.innerHTML = '';
    works.forEach(work => {
        const workElement = document.createElement('div');
        workElement.classList.add('work-item');
        workElement.innerHTML = `
        <div class="work-item-container">
            <img src="${work.imageUrl}" alt="${work.title}">
            ${isModal ? '' : `<p>${work.title}</p>`}  <!-- Affichage conditionnel du titre -->
             <span class="delete-icon"><i class="fa-solid fa-trash-can"></i></span> <!-- Icône de poubelle -->
        </div>
        `;
        gallery.appendChild(workElement);
    });
}




document.addEventListener('DOMContentLoaded', () => {
    const openModalBtn = document.getElementById('openModalBtn');
    const modal = document.getElementById('photoModal');
    const closeModalBtn = modal.querySelector('.close');
    const gallery = document.getElementById('gallery');
    const addPhotoBtn = document.getElementById('addPhotoBtn');

    let images = [];

    async function fetchImages() {
        try {
            const response = await fetch('http://localhost:5678/api/');
            const data = await response.json();
            images = data.photos;
            populateGallery();
        } catch (error) {
            console.error('Erreur lors du chargement des images:', error);
        }
    }

    function populateGallery() {
        gallery.innerHTML = '';
        images.forEach((imgObj, index) => {
            const imageContainer = document.createElement('div');
            imageContainer.classList.add('gallery');

            const img = document.createElement('img');
            img.src = imgObj.url;

            const deleteIcon = document.createElement('span');
            deleteIcon.classList.add('delete-icon');
            deleteIcon.textContent = '×';
            deleteIcon.addEventListener('click', async () => {
                try {
                    await fetch(`http://localhost:5678/api/${imgObj.id}`, {
                        method: 'DELETE',
                    });
                    images.splice(index, 1);
                    populateGallery();
                } catch (error) {
                    console.error('Erreur lors de la suppression de l\'image:', error);
                }
            });

            imageContainer.appendChild(img);
            imageContainer.appendChild(deleteIcon);
            gallery.appendChild(gallery);
        });
    }

    openModalBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        fetchImages();
    });

    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    addPhotoBtn.addEventListener('click', async () => {
        const newImageUrl = prompt('Entrez l\'URL de la nouvelle photo:');
        if (newImageUrl) {
            try {
                const response = await fetch('http://localhost:5678/api/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ url: newImageUrl })
                });
                const newImage = await response.json();
                images.push(newImage);
                populateGallery();
            } catch (error) {
                console.error('Erreur lors de l\'ajout de la nouvelle image:', error);
            }
        }
    });
});




document.addEventListener('DOMContentLoaded', () => {
    const openGalleryBtn = document.getElementById('openGalleryBtn');
    const photoGalleryModal = document.getElementById('photoGalleryModal');
    const addPhotoModal = document.getElementById('addPhotoModal');
    const closeBtns = document.querySelectorAll('.close');
    const addPhotoBtn = document.getElementById('addPhotoBtn');
    const uploadPhotoBtn = document.getElementById('uploadPhotoBtn');
    const photoInput = document.getElementById('photoInput');
    const photoGallery = document.getElementById('photoGallery');

    openGalleryBtn.addEventListener('click', () => {
        photoGalleryModal.style.display = 'block';
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            photoGalleryModal.style.display = 'none';
            addPhotoModal.style.display = 'none';
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target === photoGalleryModal) {
            photoGalleryModal.style.display = 'none';
        } else if (event.target === addPhotoModal) {
            addPhotoModal.style.display = 'none';
        }
    });

    addPhotoBtn.addEventListener('click', () => {
        addPhotoModal.style.display = 'block';
    });

    uploadPhotoBtn.addEventListener('click', () => {
        const file = photoInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imgContainer = document.createElement('div');
                imgContainer.style.position = 'relative';

                const img = document.createElement('img');
                img.src = e.target.result;

                const deleteBtn = document.createElement('button');
                deleteBtn.innerHTML = '&times;';
                deleteBtn.className = 'delete-btn';
                deleteBtn.addEventListener('click', () => {
                    if (confirm('Voulez-vous supprimer cette photo ?')) {
                        photoGallery.removeChild(imgContainer);
                    }
                });

                imgContainer.appendChild(img);
                imgContainer.appendChild(deleteBtn);
                photoGallery.appendChild(imgContainer);
            };
            reader.readAsDataURL(file);
            addPhotoModal.style.display = 'none';
        } else {
            alert('Veuillez sélectionner une photo.');
        }
    });
});*/
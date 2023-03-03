import { requestAllPosts, requestDeletePost, createPostRequest } from "./requests.js";
import { renderAllPosts, renderUserProfileImage, renderSelectedPost } from "./render.js";

function checkAuthentication(){
    const token = localStorage.getItem("@petinfo:token");

    if(!token){
        window.location = "../../index.html";
    }
}

checkAuthentication();

async function loadDashboard(){
    renderUserProfileImage();
    handleCreatePost();
    handleCreatePostForm();
    renderMain();
}

loadDashboard()


async function renderMain() {
    const allPosts = await requestAllPosts();
    renderAllPosts(allPosts);
    handleOpenPost();
    handleDeletePost();
}

function handleLogoutButton(){
    const logoutButton = document.querySelector("#logout-button");
    
    logoutButton.addEventListener("click", () => {
        localStorage.clear();
        window.location = "../../index.html"
    })
}

handleLogoutButton();

function handleOpenPost(){

    const openButtons = document.querySelectorAll(".open-button");
    const postShell = document.querySelector(".open-post__container")
    
    openButtons.forEach(button => {
        
        button.addEventListener("click", async (e) => {

            let postId = button.dataset.postId;
            const selectedPost = await renderSelectedPost(postId);
            
            postShell.showModal();
            handleClosePostButton();
        })
    })
    return postShell
}


function handleClosePostButton(){
    
    const postShell = document.querySelector(".open-post__container")
    
    const closePostButton = document.querySelector(".button__close-post");

    closePostButton.addEventListener("click", () => {
        postShell.close();
    })

}

function handleCreatePost(){

    const createButton = document.querySelector("#create-button");
    const cancelButton = document.querySelector("#cancel-button");
    const postShell = document.querySelector(".create-post__container")
    createButton.addEventListener("click", async (e) => {

        postShell.showModal();
    })

    cancelButton.addEventListener("click", () => {
      postShell.close();  
    })

    return postShell
}

function handleCreatePostForm() {
    const createFields = document.querySelectorAll(".input-create");
    const submitButton = document.querySelector("#publish-button");
    const postShell = document.querySelector(".create-post__container")
    const createBody = {};
    
    submitButton.addEventListener("click", async (buttonEvent) => {
        let count = 0;
        buttonEvent.preventDefault();
        
        createFields.forEach((input) => {
            if(input.value == ""){
                count++
            }
            
            createBody[input.name] = input.value
        })
        
        if(count !== 0){
            return alert("por favor, preencha todos os campos");
        } else {
            
            const response = await createPostRequest(createBody);
            if (response) {
                createFields.forEach((input) => {
                    input.value = "";
                });

                postShell.close();

                renderMain();

            } else {
                alert('Erro no servidor, tente novamente')
            }
        }
    })
}



async function handleDeletePost(){
   
    const deleteButtons = document.querySelectorAll(".button-delete");

    deleteButtons.forEach(button => {
        button.addEventListener("click", async (e) => {
            let postId = button.dataset.postId;
            const response = await requestDeletePost(postId);

            renderMain();

            if(response){
                showSuccessModal();
            }
        })
    })

}

function showSuccessModal(){
    const succesShell = document.querySelector(".success-alert__modal");
    succesShell.showModal();
    
    const closeButton = document.querySelector(".button__close-success");

    closeButton.addEventListener("click", () => {
        succesShell.close();
    })
}






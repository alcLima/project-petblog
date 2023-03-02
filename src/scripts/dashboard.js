import { requestAllPosts } from "./requests.js";
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
    const allPosts = await requestAllPosts();
    renderAllPosts(allPosts);
    handleOpenPost()
    
}

loadDashboard()

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

// async function handleDeletePost(){
   
//     const deleteButtons = document.querySelector(".button-delete");

//     deleteButtons.forEach(button => {
        
//         button.addEventListener("click", async (e) => {

//             let postId = button.dataset.postId;
//             const selectedPost = await requestDeletePost(postId);
//             //make requestdeletepost return true or false
//             if(selectedPost){
//                 alert("Sua postagem foi deletada com sucesso")
//                 //ou: alertar selected post, se ela retornar msg de sucesso
//             }
//         })
//     })

// }




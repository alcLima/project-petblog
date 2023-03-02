import { requestAllPosts } from "./requests.js";
import { renderAllPosts, renderUserProfileImage } from "./render.js";

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
import { requestAllPosts } from "./requests.js";
import { renderAllPosts } from "./render.js";

function checkAuthentication(){
    const token = localStorage.getItem("@petinfo:token");

    if(!token){
        window.location = "../../index.html";
    }
}

checkAuthentication();

async function loadDashboard(){
    
    const allPosts = await requestAllPosts();
    console.log(allPosts);
    renderAllPosts(allPosts);

}

loadDashboard()
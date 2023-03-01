import { requestAllPosts } from "./requests.js";

// function checkAuthentication(){
//     const token = localStorage.getItem("@petinfo: token");

//     if(!token){
//         window.location = "../../index.html";
//     }
// }

// checkAuthentication();

async function loadDashboard(){
    
    const postList = await requestAllPosts();
    console.log(postList)
    // renderAllPosts(postList);

}

loadDashboard()

requestAllPosts();
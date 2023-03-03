import { getUserProfile, requestAllPosts } from "./requests.js";

function getUserIdStorage(){
    const userIdLocalStorage = localStorage.getItem("@petinfo:userId");
    return userIdLocalStorage;
}

export async function renderUserProfileImage(){

    let userAvatarElement = document.querySelector("#header-avatar");

    const currentUserProfile = await getUserProfile();

    userAvatarElement.src = currentUserProfile.avatar;

    return(userAvatarElement)
}



export function renderAllPosts(allPosts){
    
    const postList = document.querySelector(".post-list");
    while (postList.firstChild) {
        postList.removeChild(postList.firstChild);
    }

    allPosts.forEach(post => {
       
        const addedPost = createPost(post);

        postList.appendChild(addedPost);

    });

}

function createPost({ id, user, createdAt, title, content}){
    
    const post = document.createElement("li");

    let date = new Date(createdAt)
    const formatedDate = formatDate(date);

    const editButton = createEditButton(user.id, id);
    const deleteButton = createDeleteButton(user.id, id);
    
    post.insertAdjacentHTML("afterbegin", `
        <div class="post-header__container">
            
            <div class="post-info__container">
                <div class="usercard" data-user-id="${user.id}">
                <img src="${user.avatar}" alt="foto de usuário de ${user.username}"/>
                <span class="text--regular">${user.username}</span>
            </div>

        <span class="text-soft"> |  ${formatedDate}</span>
            </div>
            <div class="edit-buttons__container">
                ${editButton}
                ${deleteButton}
            </div>

        </div>

        <article>
            
            <h3>${title}</h3>
            <p>${content.substring(0,145)}...</p>

            <button class="button-post open-button" data-post-id="${id}">Acessar publicação</button>
        </article>
    `)

    return post
}

function formatDate(date){

    const months = {
        1: "Janeiro",
        2: "Fevereiro",
        3: "Março",
        4: "Abril",
        5: "Maio",
        6: "Junho",
        7: "Julho",
        8: "Agosto",
        9: "Setembro",
        10: "Outurbro",
        11: "Novembro",
        12: "Dezembro",
    }
    
    const monthNumber = date.getMonth();
    const formatedMonth = months[monthNumber];

    const formatedYear = date.getFullYear();

    const formatedDate = `${formatedMonth} de ${formatedYear}`

    return formatedDate;
}



function createEditButton(postAuthorId, postId) {
    const currentUserId = getUserIdStorage();

    if(postAuthorId === currentUserId){
        
        return `<button data-post-id="${postId}" class="button-post button-edit">Editar</button>`
        
    } else {
        return '';
    }
}

function createDeleteButton(postAuthorId, postId){
    
    const currentUserId = getUserIdStorage();

    if(postAuthorId === currentUserId){
        
        return `<button data-post-id="${postId}" class="button-post button-delete">Deletar</button>`
        
    } else {
        return '';
    }
}

export async function renderSelectedPost(postId) {
    
    const modalShell = document.querySelector(".open-post__container");
    modalShell.innerHTML = "";
    
    const selectedPost = await findPost(postId)

    const postContent = createInnerContent(selectedPost);
    modalShell.innerHTML = postContent;

    return postContent

}

async function findPost(postId){
    
    const allPosts = await requestAllPosts();

    const selectedPost = allPosts.find(post => post.id === postId);
    
    return selectedPost;

}

function createInnerContent({ user, createdAt, title, content }){

    let date = new Date(createdAt);
    const formatedDate = formatDate(date);
    
    const postContent = `
        <div class="post__inner-container">
            <div class="post-header__container">

                <div class="post-info__container">
                    <div class="usercard" data-user-id="${user.id}">
                    <img src="${user.avatar}" alt="foto de usuário de ${user.username}"/>
                    <span class="text--regular">${user.username}</span>
                </div>

                <span class="text-soft"> |  ${formatedDate}</span>
                </div>
            <button class="button__close-post">X</button>
            </div>

        <article>

            <h3>${title}</h3>
            <p>${content}...</p>

        </article>
        </div>
`
        
    return postContent;
}




//___________________________________________________________________________________________________

// function createModal(array, id){
//     //tem que retornar a variável com html dentro
//     let selectedPost = array.find(post => post.id == id);
  
//     const modalContent = `
//       <div class="modal__inner-container">
        
//         <div class="user-profile-card">
//           <img src="${selectedPost.img}" class="user__img" alt="user-profile-picture"/>
//           <div class="user-intro">
//             <h3>${selectedPost.user}</h3>
//             <span class="user-about">${selectedPost.stack}</span>
//           </div>
//         </div> 
  
//         <h2 class="post-title">${selectedPost.title}</h2>
//         <p class="post-content">${selectedPost.text}</p>
        
//         <button class="button--white" id="button-close">x</button>
//       </div>  `
  
//     return modalContent
  
//   }
  





// const post = {
// 	"id": "c63571f7-146c-4cf5-8db7-11c091c9d460",
// 	"title": "About avatar",
// 	"content": "The world is divided into four nations -- the Water Tribe, the Earth Kingdom, the Fire Nation and and the Air Nomads -- each represented by a natural element for which the nation is named. Benders have the ability to control and manipulate the element from their nation. Only the Avatar is the master…",
// 	"createdAt": "2023-03-01T18:38:30.960Z",
// 	"user": {
// 		"id": "8cce6e00-c8c0-46b3-8bf0-449754591be6",
// 		"username": "Ana",
// 		"email": "maz@mail.com",
// 		"avatar": "https://avatars.githubusercontent.com/u/101673023?s=40&v=4"
// 	}
// }
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

        <span class="text--soft"> |  ${formatedDate}</span>
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
        
        return `<button data-post-id="${postId}" class="button-grey button-edit">Editar</button>`
        
    } else {
        return '';
    }
}

function createDeleteButton(postAuthorId, postId){
    
    const currentUserId = getUserIdStorage();

    if(postAuthorId === currentUserId){
        
        return `<button data-post-id="${postId}" class="button-delete">Deletar</button>`
        
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

export async function findPost(postId){
    
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

// export async function renderSelectedPost(postId) {
    
   
//     const submitButton = document.querySelector("#publish-button");
    
//     const selectedPost = await findPost(postId);

//     const postFieldsContent = fillEditFields(selectedPost);

//     // editShell.innerHTML = "";
    
//     // modalShell.innerHTML = postFieldsContent;

//     return postFieldsContent

// }

// function fillEditFields({title, content}){
//      const editShell = document.querySelector(".create-post__container");
    
//      return console.log(editShell)

     
// }





export function renderAllPosts(allPosts){
    
    postList = document.querySelector(".post-list");
    postList.innerHtml = "";

    allPosts.forEach(post => {
       
        addedPost = createPosts(post);
        postList.appendChild(addedPost);

    });

}

function createPosts({ id, user, createdAt, title, content}){
    const post = document.createElement("li");

    let date = new Date(createdAt).toLocaleDateString;
    console.log(date)

    post.insertAdjacentHTML = ("afterbegin", `
        <div class="post-header">

            <div class="usercard" data-userId="${user.id}">
                <img src="${user.avatar}" alt="foto de usuário de ${user.username}"/>
                <span class="text--regular">username</span>
            </div>
            <span class="text-soft">|  ${date}</span>
        
        </div>

        <article>
            <h3>${title}</h3>
            <p>${content}</p>

            <button class="button-post" id="${id}">Acessar publicação</button>
        </article>
    `)
}





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
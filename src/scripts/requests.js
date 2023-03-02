const baseUrl = "http://localhost:3333";

function getTokenStorage(){
    const tokenLocalStorage = localStorage.getItem("@petinfo:token");
    return tokenLocalStorage;
}


export async function loginRequest(loginBody) {
    
    const response = await fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginBody),
    })
    
    if(response.ok){
        const responseToken = await response.json()
        localStorage.setItem("@petinfo:token", JSON.stringify(responseToken.token));
        return responseToken.token;
        
    } else {
        alert("senha ou usuário inválidos");
    }
}

export async function getUserProfile() {
    const token = getTokenStorage();
    const userDataJson = await fetch (`${baseUrl}/users/profile`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${token}`
        },
    })
    const userProfile = await userDataJson.json();
    
    return(userProfile);

}

export async function createUserRequest(signupBody){
    const signup = await fetch (`${baseUrl}/users/create`, {
        method: "POST",
        headers: {
            "content-Type" : "application/json"
        },
        body: JSON.stringify(signupBody),
    }).then((responseJSON) => {
        if(responseJSON.ok){
            console.log(responseJSON);
            const response = responseJSON.json().then((response) => {
                console.log(response)
                alert("cadastro realizado com sucesso, faça login");
            })
            return response
            
        } else {
            alert ("Cadastro não realizado, por favor tente novamente.")
        }
    })
    return signup
}

export async function requestAllPosts(){
    const token = getTokenStorage()
    const posts = await fetch (`${baseUrl}/posts`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    const postList = await posts.json();

    return(postList);
}

// export async function requestDeletePost(postId){
    
//     const postDeleted = await fetch (`${baseUrl}/posts/${postId}` , {
//         method: "DELETE",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}`
//         }
//     }).then((responseJSON) => {
//         if(responseJSON.ok){
//             console.log(responseJSON);
//             const response = responseJSON.json().then((response) => {
//                 console.log(response)
//                 alert("post deletado com sucesso");
//                 return true
//             })
            
//         } else {
//             console.log(responseJSON)
//             alert ("post não deletado")
//             return false
//         }
//     })
// }


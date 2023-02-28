const baseUrl = "http://localhost:3333";

const tokenLocalStorage = localStorage.getItem("@petinfo: token");

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


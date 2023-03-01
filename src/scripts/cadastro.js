import { createUserRequest } from "./requests.js";

function handleCreateUser(){
    const signupFields = document.querySelectorAll(".input-signup");

    const signupButton = document.querySelector("#signup-button");

    signupButton.addEventListener("click",(event) => {
        event.preventDefault();

        let count = 0;
        const signupBody = {};
        //input keys: { name , value }
        signupFields.forEach(({ name, value }) => {
            if(value == ""){
                count++
                console.log(`campo ${name} vazio`)
            } 
            
            signupBody[name] = value
        });

        if(count !== 0){
            return alert("por favor, preecha todos os campos")
            //alterar para toast depois
        } else {
            signupResponse = createUserRequest(signupBody);

            signupFields.forEach((input) => {
                input.value = "";
            })
            }
    })
    return signupResponse
}

handleCreateUser();

function handleRedirectToLogin() {
    
    const redirectButton = document.querySelector("#redirect-login");

    redirectButton.addEventListener("click", () => {
        window.location = "../../index.html";
    })
}

handleRedirectToLogin()




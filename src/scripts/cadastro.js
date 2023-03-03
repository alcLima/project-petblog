import { createUserRequest } from "./requests.js";

function handleCreateUser(){
    const signupFields = document.querySelectorAll(".input-signup");

    const signupButton = document.querySelector("#signup-button");

    signupButton.addEventListener("click", async (event) => {
        event.preventDefault();

        let count = 0;
        const signupBody = {};
        
        signupFields.forEach(({ name, value }) => {
            if(value == ""){
                count++
                console.log(`campo ${name} vazio`)
            } 
            
            signupBody[name] = value
        });

        if(count !== 0){
            return alert("por favor, preecha todos os campos")
           
        } else {
            const signupResponse = await createUserRequest(signupBody);

            if (signupResponse) {

                signupFields.forEach((input) => {
                    input.value = "";
                })
                alert(signupResponse)
                window.location = "/";
            } else {

                alert(signupResponse)
            }
        }
    })
    
}

handleCreateUser();

function handleRedirectToLogin() {
    
    const redirectButton = document.querySelector("#redirect-login");

    redirectButton.addEventListener("click", () => {
        window.location = "../../index.html";
    })
}

handleRedirectToLogin()




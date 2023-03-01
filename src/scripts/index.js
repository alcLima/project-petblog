
import { loginRequest } from "./requests.js";

let loginAna = {
    email: "maz@mail.com",
    password: "string"
}


await loginRequest(loginAna)



function handleLogin(){
    const loginFields = document.querySelectorAll(".input-login");
    const loginButton = document.querySelector("#button-login");

    const loginBody = {};
    let count = 0;


    loginButton.addEventListener("click", async (buttonEvent) => {
        
        buttonEvent.preventDefault();
        
        loginFields.forEach((input) => {
            if(input.value == ""){
                count++
            }
            
            loginBody[input.name] = input.value
            
        })
        
        console.log(loginBody)
        
        if(count !== 0){
            return alert("por favor, preencha todos os campos");
        } else {
            const userToken = await loginRequest(loginBody);
            console.log(userToken);
            loginFields.forEach((input) => {
                input.value = "";
            });
            return(userToken);
        }
    })
    
}

handleLogin();

function handleRedirectToSignUp() {
    
    const redirectButton = document.querySelector("#button-signup-redirect");

    redirectButton.addEventListener("click", () => {
        window.location = "./src/pages/cadastro.html";
    })
}

handleRedirectToSignUp();
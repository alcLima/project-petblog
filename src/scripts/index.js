
import { loginRequest, getUserProfile } from "./requests.js";

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

            loginFields.forEach((input) => {
                input.value = "";
            });
        
            localStorage.setItem("@petinfo:token", userToken);
            const userProfile = await getUserProfile();
            const userId = userProfile.id;
            localStorage.setItem("@petinfo:userId", userId);
            window.location = "/src/pages/dashboard.html";
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

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
    console.log(loginFields)

    loginButton.addEventListener("click", async (buttonEvent) => {
        
        buttonEvent.preventDefault();

        loginFields.forEach(( {name, value}) => {
            console.log(input)
            if(value == ""){
                count++
            }
            
            // loginBody[input.name] = input.value
            loginBody[name] = value; 
        })

        if(count !== 0){
            return alert("por favor, preencha todos os campos");
        } else {
            const userToken = await loginRequest(loginBody);
            console.log(userToken);
            return(userToken);
        }

    })
    console.log(loginBody)
}

handleLogin();
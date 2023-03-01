function checkAuthentication(){
    const token = localStorage.getItem("@petinfo: token");

    if(!token){
        window.location = "../../index.html";
    }
}
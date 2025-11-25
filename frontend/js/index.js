(function(){
    window.addEventListener("DOMContentLoaded", ()=> {
            const idUsuario = localStorage.getItem("idUsuarioActivo");
            if(!idUsuario) {
            window.location.href = "frontend/login.html";

    
                return;
            }
        })

})()
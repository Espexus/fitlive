(function(){
    window.addEventListener("DOMContentLoaded", async ()=> {
        const idUsuario = localStorage.getItem("idUsuarioActivo")
        if(!idUsuario) {
            window.location.href("/fitlive/frontend/login.html");
            return;
        }
        let resultado;

        try {
            const res = await fetch(`http://localhost:3000/api/exp/${idUsuario}`);
            if(!res.ok) { throw new Error ("error en la consulta") }
            resultado = await res.json();

        } catch(error) {
            console.error("error", error)
        }

        exp = resultado[0].exp;

        calcularNivel(exp);
    })

    let personaje;
    let expProx;
    let expFaltante;

    const imagen = document.getElementById("imagen")
    const nivel = document.getElementById("nivel-space")
    const proximo = document.getElementById("prox-space")
    const faltante = document.getElementById("faltante-space")
    function calcularNivel(exp) {
        switch (true) {
            case exp < 200:
                personaje = "img/niv0.jpg";
                expProx = 200
                expFaltante = expProx - exp
                break;

            case exp < 600:
                personaje = "img/niv1.jpg";
                expProx = 600
                expFaltante = expProx - exp
                break;
            
            case exp < 800:
                personaje = "img/niv2.jpg";
                expProx = 800
                expFaltante = expProx - exp
                break;

            case exp < 900:
                personaje = "img/niv3.jpg";
                expProx = 900
                expFaltante = expProx - exp
                break;

            case exp < 1000:
                personaje = "img/niv4.jpg";
                expProx = 1000
                expFaltante = expProx - exp
                break;

            case exp < 1300:
                personaje = "img/niv5.jpg";
                expProx = 1300
                expFaltante = expProx - exp
                break;

            case exp < 2000:
                personaje = "img/niv6.jpg";
                expProx = 2000
                expFaltante = expProx - exp
                break;

            case exp < 3000:
                personaje = "img/niv7.jpg";
                expProx = 3000
                expFaltante = expProx - exp
                break;

            case exp < 4500:
                personaje = "img/niv8.jpg";
                expProx = 4500
                expFaltante = expProx - exp
                break;

            case exp < 8000:
                personaje = "img/niv9.jpg";
                expProx = 5000
                expFaltante = expProx - exp
                break;

            default:
                personaje = "img/niv10.jpg";
                expProx = "Estás en el nivel máximo"
                expFaltante = 0
            
        }

        actualizarInformacion(exp, personaje, expProx, expFaltante);
    }
    
    function actualizarInformacion (exp, personaje, expProx, expFaltante) {
        imagen.src = personaje;
        nivel.textContent = `Exp actual: ${exp}`
        proximo.textContent = `Exp para el próximo nivel: ${expProx}`
        faltante.textContent = `Exp faltante: ${expFaltante}`
    }

})()
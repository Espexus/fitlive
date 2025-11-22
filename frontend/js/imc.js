(function(){

    window.addEventListener("DOMContentLoaded", ()=> {
        const idUsuario = localStorage.getItem("idUsuarioActivo");
        if(!idUsuario) {
            window.location.href = "/fitlive/frontend/login.html";

            return;
        }
    })

    // obtener el imc actual al cargar la página primero
    let imcActual = document.getElementById("imc-actual");

    let imc;
    let idUsuario;

    window.addEventListener("DOMContentLoaded", async () => {
        idUsuario = localStorage.getItem("idUsuarioActivo");
        console.log(idUsuario)

        await buscarImc(idUsuario);
    })

    async function buscarImc(id) {
        let resultado;
        try {
            const res = await fetch (`http://localhost:3000/api/imc/${id}`);
            if(!res.ok) {
                throw new Error ("tenemos un error en la consulta bro");
            }
            resultado = await res.json();

            await mostrarImc(resultado);

        } catch (error) {
            console.error("error", error)
        }
    }

    async function mostrarImc(resultado) {
        imc = resultado[0].imc || "Por ahora no agregado";
        imcActual.textContent = `TU IMC ACTUAL ES: ${imc}`;
    }


    // mecanismo de la calculadora de imc
    const imcCalculo = document.getElementById("respuesta-imc");
    const contenedorRI = document.getElementById("contenedor-respuesta-imc");

    const formularioImc = document.getElementById("formulario-imc");
    formularioImc.addEventListener("submit", async (e) => {
        e.preventDefault();
        const datos = new FormData(formularioImc);

        await calcularImc(datos);
    })

    async function calcularImc (datos) {
        const peso = Number(datos.get("peso"))
        const altura = Number(datos.get("altura"))/100;
        if(!peso || !altura) {
            alert("Necesitas poner tu peso y altura para poder cálcular tu IMC");
            return;
        }

        let imc = (peso/(altura*altura)).toFixed(2);
        imcCalculo.textContent = imc;

        if (document.getElementById("ActualizarImc")) {
            return;
        }

        let boton = document.createElement("button");
        boton.textContent = "Actualizar";
        boton.id = "ActualizarImc";
        boton.className = "boton";

        contenedorRI.appendChild(boton);

        boton.addEventListener("click", async () => {
            await actualizarIMC(imc);
        })
        
    }


    async function actualizarIMC(imc) {
        try {
            const res = await fetch (`http://localhost:3000/api/imc/${idUsuario}/${imc}`, {
                method: "PUT"
            })
            if (!res.ok) {
                throw new Error ("error al hacer la consulta");
            }
            const respuesta = await res.json();
            alert (respuesta.message)

        } catch (error) {
            console.error("error", error)

        }
        window.location.reload()
    }
})()
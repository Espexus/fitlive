(function(){

    const formulario = document.getElementById("formulario-login");
    formulario.addEventListener("submit", async (e) => {
        e.preventDefault();
        console.log("evento")

        const datos = new FormData(formulario);

        await revisarDatos(datos);
    })

    async function revisarDatos(datos) {
        console.log("verify")

        const alias = datos.get("alias");
        const clave = datos.get("clave");

        if (!alias || !clave) {
            alert("llena todos los datos por favor");
            return;
        }

        await revisarLogin(alias, clave);
    }

    async function revisarLogin(alias, clave) {
        let respuesta;
        try {
            const res = await fetch("http://localhost:3000/api/usuarios/login", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({alias, clave})
            })

            if(!res.ok) {
                throw new Error ("error en la consulta hecha");
            }
            respuesta = await res.json();

        } catch (error) {
            console.error("error", error)
        }
        if(respuesta.length != 0) {
            localStorage.setItem("idUsuarioActivo", respuesta[0].id);
            window.location.href = "../index.html";
        } else {
            alert("contraseña incorrecta o no tienes una cuenta, recuerda tu clave o crea una cuenta nueva bro")
        }
    }
})()
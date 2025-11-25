(function(){
    const formulario = document.getElementById("formulario-registro");
    formulario.addEventListener("submit", async (e) => {
        e.preventDefault();
        console.log("se ejecuta mi función");


        const datos = new FormData(formulario);
        
        await revisarDisponibilidad(datos);
    })

    async function revisarDisponibilidad(datos) {
        const alias = datos.get("alias");
        let respuesta;
        try {
            const res = await fetch(`http://localhost:3000/api/usuarios/verificar_disponibilidad/${alias}`)

            if(!res.ok) {
                throw new Error ("error en la petición");
            }
            respuesta = await res.json();

        } catch (error) {
            console.error("error en la consulta", error);
            return;
        }

        if (respuesta.length != 0) {
            alert(`el alias ${respuesta[0].alias} ya está en uso, elige uno diferente`);
        } else {
            await revisarDatos(datos);
        }
    }

    async function revisarDatos (datos){
        const alias = datos.get("alias");
        const clave = datos.get("clave");
        const correo = datos.get("correo");
        const edad = parseInt(datos.get("edad")) || null;
        const pais = datos.get("nacionalidad") || null;

        if (!alias || !clave || !correo) {
            alert("llena todos los datos obligatorios: alias, clave y correo")
            return;
        }

        await enviarDatos(alias, clave, correo, edad, pais);
    }

    async function enviarDatos(alias, clave, correo, edad, pais) {
        console.log("ejecuta enviarDatos")
        try {
            const res = await fetch("http://localhost:3000/api/usuarios/", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({alias, clave, correo, edad, pais})
            })
            if(!res.ok) {
                throw new Error ("error en la petición");
            }

            const respuesta = await res.json();
            console.log("exito ", respuesta.id)

            localStorage.setItem("idUsuarioActivo", respuesta.id)

            alert(`tu usuario ha sido creado id: ${respuesta.id}, alias: ${respuesta.alias}, correo: ${respuesta.correo}`);

            window.location.href = "../index.html";

        }
        catch(err) {
            console.log("error");
            console.error("fallo algo ", err)
        }
        
    }
})();
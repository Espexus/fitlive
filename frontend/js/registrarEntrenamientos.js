(function(){
    let exp;
window.addEventListener("DOMContentLoaded", async ()=> {
    const idUsuario = localStorage.getItem("idUsuarioActivo")

    if(!idUsuario) {
            window.location.href("/fitlive/frontend/login.html");
            return;
        }

    try {
        const res = await fetch(`http://localhost:3000/api/exp/${idUsuario}`);
        if(!res.ok) { throw new Error ("error en la consulta") }
        const resultado = await res.json();

    } catch(error) {
        console.error("error", error)
    }

    exp = resultado[0].exp;
    console.log(exp);
})

const formulario = document.getElementById("formulario-reg-entrenos");
formulario.addEventListener("submit", async (e) => {
    e.preventDefault();

    const datos = new FormData(formulario);

    await verificarDatos(datos);
    
})

async function verificarDatos(datos) {
    const tipo = datos.get("tipo");
    const grupoM = datos.get("grupoM");
    const intensidad = parseInt(datos.get("intensidad"));
    const tiempo = parseInt(datos.get("tiempo"));
    const idUsuario = parseInt(localStorage.getItem("idUsuarioActivo"));

    if(!tipo || !grupoM || !intensidad || !tiempo) {
        alert("llena todos los datos por favor");
        return;
    }

    await registrarEntreno(idUsuario, intensidad, tiempo, tipo, grupoM);
}

async function registrarEntreno(idUsuario, intensidad, tiempo, tipo, grupoM) {
    try {
        const res = await fetch("http://localhost:3000/api/entrenamientos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({id: idUsuario, intensidad, tiempo, tipo, grupo: grupoM})
        })
        if (!res.ok){ throw new Error("Error al mandar la consulta") };

        const resultado = await res.json();

        alert(resultado.message);
        await actualizarExp(idUsuario, intensidad, tiempo);

    } catch (error) {
        console.error("error ", error)
    }
}

async function actualizarExp (idUsuario, intensidad, tiempo) {
    const expNueva = exp + (intensidad * tiempo);

    try {
        const res = await fetch(`http://localhost:3000/api/exp/${idUsuario}/${expNueva}`, {
            method: "PUT"
        });
        if(!res.ok){ throw new Error("error en la consulta") }
        const resultado = await res.json();
        console.log(expNueva, exp);
        alert(resultado.message)
        window.location.reload();
    } catch (error) {
        console.error("error ", error)
    }
}

})();
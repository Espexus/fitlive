(function(){
    window.addEventListener("DOMContentLoaded", async ()=> {
        let resultado;
        const idUsuario = parseInt(localStorage.getItem("idUsuarioActivo"));
        console.log(idUsuario)
        try {
            const res = await fetch(`http://localhost:3000/api/entrenamientos/${idUsuario}`);

            if (!res.ok) {
                throw new Error ("error al realizar la consulta");
            } 
            resultado = await res.json();
        }
        catch (error) {
            console.error("error", error)
        }


        await mostrarEntrenamientos(resultado);
    })

    const espacioRespuesta = document.getElementById("respuesta");
    async function mostrarEntrenamientos(resultado) {

        const table = document.createElement("table");
        const fila1 = document.createElement("tr");

        const thTipo = document.createElement("th");
        const thGrupo = document.createElement("th");
        const thTiempo = document.createElement("th");
        const thIntensidad = document.createElement("th");
        const thFecha = document.createElement("th");

        thTipo.textContent = "Tipo"
        thGrupo.textContent = "Grupo"
        thTiempo.textContent = "Tiempo"
        thIntensidad.textContent = "Intensidad"
        thFecha.textContent = "Fecha"

        fila1.appendChild(thTipo)
        fila1.appendChild(thGrupo)
        fila1.appendChild(thTiempo)
        fila1.appendChild(thIntensidad)
        fila1.appendChild(thFecha)
        table.appendChild(fila1)

        resultado.forEach(registro => {
            const fila = document.createElement("tr");

            const Tipo = document.createElement("td");
            const Grupo = document.createElement("td");
            const Tiempo = document.createElement("td");
            const Intensidad = document.createElement("td");
            const Fecha = document.createElement("td");

            Tipo.textContent = registro.tipo
            Grupo.textContent = registro.grupoMuscular
            Tiempo.textContent = registro.tiempo
            Intensidad.textContent = registro.intensidad
            Fecha.textContent = registro.fecha

            fila.appendChild(Tipo)
            fila.appendChild(Grupo)
            fila.appendChild(Tiempo)
            fila.appendChild(Intensidad)
            fila.appendChild(Fecha)
            table.appendChild(fila)
        });
        espacioRespuesta.appendChild(table);
    }

})()
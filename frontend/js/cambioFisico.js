(function(){
    window.addEventListener("DOMContentLoaded", ()=> {
        const idUsuario = localStorage.getItem("idUsuarioActivo");
        if(!idUsuario) {
            window.location.href = "/fitlive/frontend/login.html";

            return;
        }
    })

    const espacioRespuesta = document.getElementById("respuestas");
    const formulario = document.getElementById("formulario-cambio-fisico");

    formulario.addEventListener("submit", (e)=> {
        console.log("ejecuta");
        e.preventDefault();

        const datos = new FormData(formulario);

        calculoRecomendado(datos)
    })
    function calculoRecomendado (datos) {
        console.log("ejecuta");

        const pesoActual = Number(datos.get("peso"))
        const pesoObj = Number(datos.get("pesoObj"))
        const tiempo = Number(datos.get("tiempo"))

        let indice = ((pesoObj - pesoActual)/tiempo).toFixed(2);
        console.log(indice);
        let plan;
        
        switch(true) {
            case indice <= -5 && indice >-7:
                plan = `<p>Lo siento amigo, no creo que sea saludable lo que buscas hacer, busca un peso objetivo o tiempo más realistas</p>`;
                break;

            case indice <= -4:
                plan = `
                <p><strong>Alimentación:</strong> déficit muy fuerte, prioriza proteínas magras y verduras, considerar supervisión profesional.</p>
                <p><strong>Ejercicio:</strong> cardio intenso 5x/semana + fuerza 3x/semana.</p>`;
                break;

            case indice <= -3:
                plan = `
                <p<strong>Alimentación:</strong>> déficit de 500-600 kcal, prioriza proteínas y vegetales, reduce azúcares simples.</p>
                <p><strong>Ejercicio:</strong> cardio 3x/semana + fuerza 2x/semana.</p>`;
                break;

            case indice <= -2:
                plan = `
                <p><strong>Alimentación:</strong> déficit moderado 300-500 kcal, incluye frutas, proteínas y carbohidratos complejos.</p>
                <p><strong>Ejercicio:</strong> caminata + 2 sesiones de fuerza ligera/semana.</p>`;
                break;

            case indice <= 0:
                plan= `
                <p><strong>Alimentación:</strong> déficit ligero 200-300 kcal, enfócate en vegetales y proteínas magras.</p>
                <p><strong>Ejercicio:</strong> caminata diaria 30 min, movilidad ligera.</p>`;
                break;

            case indice <= 1:
                plan = `<h3>Rango 1 (0.5 - 1 kg/mes)</h3>
                <p><strong>Desayuno:</strong> Avena con fruta y leche</p>
                <p><strong>Almuerzo:</strong> Pollo a la plancha con arroz integral y verduras</p>
                <p><strong>Cena:</strong> Tortilla de huevos con pan integral</p>
                <p><strong>Snacks:</strong> Yogur con nueces, batido de proteína</p>
                <p><strong>Ejercicio recomendado:</strong> 2-3 días de entrenamiento de fuerza ligero y caminatas diarias</p>`;
                break;

            case indice <=2:
                plan = `<p><strong>Desayuno:</strong> Pan integral con mantequilla de maní y banana</p>
                <p><strong>Almuerzo:</strong> Pescado con quinoa y verduras</p>
                <p><strong>Cena:</strong> Pollo, patata cocida y ensalada</p>
                <p><strong>Snacks:</strong> Frutos secos, batido de frutas con proteína</p>
                <p><strong>Ejercicio recomendado:</strong> 3-4 días de fuerza moderada + cardio ligero 1-2 días</p>`;
                break;
            
            case indice <=3:
                plan = `<p><strong>Desayuno:</strong> Huevos revueltos con aguacate y pan integral</p>
                <p><strong>Almuerzo:</strong> Carne magra con arroz y verduras</p>
                <p><strong>Cena:</strong> Pescado con batata y ensalada</p>
                <p><strong>Snacks:</strong> Yogur con fruta, frutos secos</p>
                <p><strong>Ejercicio recomendado:</strong> 4 días de fuerza + 1-2 días de cardio ligero</p>`;
                break;

            case indice <=4:
                plan = `<p><strong>Desayuno:</strong> Batido de avena, plátano y mantequilla de maní</p>
                <p><strong>Almuerzo:</strong> Carne roja con arroz, verduras y aceite de oliva</p>
                <p><strong>Cena:</strong> Pescado, patatas y ensalada</p>
                <p><strong>Snacks:</strong> Frutos secos, barra de proteína, yogur</p>
                <p><strong>Ejercicio recomendado:</strong> 4-5 días de fuerza intensa + cardio moderado 2 días</p>`;
                break;

            case indice <=6:
                plan= ` <p><strong>Desayuno:</strong> Huevos, avena, fruta y batido de proteína</p>
                <p><strong>Almuerzo:</strong> Carne magra con arroz, legumbres y verduras</p>
                <p><strong>Cena:</strong> Pescado o pollo con patata y ensalada</p>
                <p><strong>Snacks:</strong> Yogur, frutos secos, batido de proteína, pan con mantequilla de maní</p>
                <p><strong>Ejercicio recomendado:</strong> 5-6 días de fuerza intensa + cardio moderado 2-3 días</p>`;
                break;

            case indice > 6:
                plan = `<p>Me parece que lo que quieres intentar no es sano, mejor replantea tu peso objetivo o tu tiempo hasta alcanzarlo y vuelve a intentarlo.</p>`
                break;

            default:
                plan = `<p>No se pudo generar un plan, revisa los datos.</p>`;  

        }
        console.log(plan);
        espacioRespuesta.innerHTML = plan;
    }
})()
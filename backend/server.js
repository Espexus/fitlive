const express = require("express");
const cors = require("cors");
const db = require("./bd");

const app = express();
app.use(cors());
app.use(express.json());

// métodos para la calculadora de IMC

app.get("/api/imc/:id_usuario", (req, res) => {
    const {id_usuario} = req.params;
    
    if(!id_usuario) {
        return res.status(400).json({error: "faltan datos"})
    } else if (isNaN(id_usuario)) {
        return res.status(400).json({error: "datos invalidos"})
    }

    db.query("CALL consultarIMC (?)", [id_usuario], (err, resultado) => {
        if(err) {
            return res.status(500).json({error: "hubo un error con la base de datos"});
        } 
        res.json(resultado[0]);
    })
})

app.put("/api/imc/:id_usuario/:new_imc", (req, res) => {
    const {id_usuario, new_imc} = req.params;

    if (!id_usuario || !new_imc) {
        return res.status(400).json({error: "faltan datos"});
    } else if (isNaN(id_usuario) || isNaN(new_imc)){
        return res.status(400).json({error: "datos invalidos"});
    }

    db.query("CALL actualizarIMC (?, ?)", [id_usuario, new_imc], (err, resultado) => {
        if(err) {
            return res.status(500).json({error: "problema de comunicación con la bd"});
        }
        res.json({message: "actualizado correctamente"});
    })
})

// metodos para entrenamientos
app.get("/api/entrenamientos/:id_usuario", (req, res) => {
    const {id_usuario} = req.params;

    if(!id_usuario) {
        return res.status(400).json({error: "faltan datos"})
    } else if (isNaN(id_usuario)) {
        return res.status(400).json({error: "datos invalidos"})
    }

    db.query("CALL obtenerEntrenos(?)", [id_usuario], (err, resultado) => {
        if(err) {
            return res.status(500).json({error: "problema de comunicación con la bd"});
        }
        res.json(resultado[0])
    })
})

app.post("/api/entrenamientos", (req, res) => {
    const {id, intensidad, tiempo, tipo, grupo} = req.body;

    if(!id || !intensidad || !tiempo || !tipo || !grupo) {
        return res.status(400).json({error: "faltan datos"});

    } else if (isNaN(id) || isNaN(intensidad) || isNaN(tiempo)){
        return res.status(400).json({error: "datos invalidos"})
    }

    db.query("CALL registroEntrenos (?, ?, ?, ?, ?)", [id, intensidad, tiempo, tipo, grupo], (err, resultado) => {
        if(err) {
            return res.status(500).json({error: "problema de comunicación con la bd"});
        }
        res.json({message: "datos registrados correctamente"});
    })
})

app.delete("/api/entrenamientos/:id_entreno", (req, res) => {
    const {id_entreno} = req.params;

    if(!id_entreno || isNaN(id_entreno)) {
        return res.status(400).json({error: "datos invalidos o faltantes"})
    }
    
    db.query("CALL borrarEntreno (?)", [id_entreno], (err, resultado) => {
        if(err) {
            return res.status(500).json({error: "problema de comunicación con la bd"});
        }

        res.json({message: "borrado correcto", id_borrado: id_entreno})
    })
})

// metodos para usuarios, registro y login

app.get("/api/usuarios/verificar_disponibilidad/:alias", (req, res) => {
    const {alias}  = req.params;

    if(!alias) {
        return res.status(400).json({error: "faltan datos"})
    }

    db.query("CALL verificarUsuarioExistente (?)", [alias], (err, resultado) => {
        if(err) {
            return res.status(500).json({error: "error en la consulta"})
        }
        res.json(resultado[0]);
    })
})

app.post("/api/usuarios/login", (req, res) => {
    const {alias, clave}  = req.body;

    if(!alias || !clave) {
        return res.status(400).json({error: "faltan datos"})
    }

    db.query("CALL verificarLogin (?, ?)", [alias, clave], (err, resultado) => {
        if(err) {
            return res.status(500).json({error: "error en la consulta"})
        }
        res.json(resultado[0])
    })
})

app.post("/api/usuarios/", (req, res) => {
    console.log("BODY RECIBIDO:", req.body);
    console.log("LLEGÓ PETICIÓN AL BACKEND");
    const {alias, clave, correo, edad, pais} = req.body;

    if(!alias || !clave || !correo) {
        return res.status(400).json({error: "faltan datos"});

    } else if(edad) {
            if (isNaN(edad)){
            return res.status(400).json({error: "dato de edad inválido"})
        }
    }

    db.query("CALL registrarUsuario (?, ?, ?, ?, ?)", [alias, clave, correo, edad, pais], (err, resultado) => {
        console.log(resultado);
        if(err) {
            return res.status(500).json({error: "problema de comunicación con la bd", err});
        }
        id = resultado[0][0].id
        res.json({message: "usuario creado", id, alias, correo, edad, pais});
    })
})

// metodos para la parte del exp del jugador

app.get("/api/exp/:id_usuario", (req, res) => {
    const {id_usuario}  = req.params;

    if(!id_usuario) {
        return res.status(400).json({error: "faltan datos"})
    }

    db.query("CALL obtenerExp (?)", [id_usuario], (err, resultado) => {
        if(err) {
            return res.status(500).json({error: "error en la consulta"})
        }
        res.json(resultado[0])
    })
})

app.put("/api/exp/:id_usuario/:new_exp", (req, res) => {
    const {id_usuario, new_exp} = req.params;

    if (!id_usuario || !new_exp) {
        return res.status(400).json({error: "faltan datos"});
    } else if (isNaN(id_usuario) || isNaN(new_exp)){
        return res.status(400).json({error: "datos invalidos"});
    }

    db.query("CALL actualizarExp (?, ?)", [id_usuario, new_exp], (err, resultado) => {
        if(err) {
            return res.status(500).json({error: "problema de comunicación con la bd"});
        }
        res.json({message: "Tu exp fue actualizado correctamente", new_exp});
    })
})

//

app.listen(3000, () => {

    console.log("conectado en el puerto 3000 http://localhost:3000")
})
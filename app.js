const express = require('express');
const mysql= require('mysql2');
var app = express();

var bodyParser= require('body-parser');

var con= mysql.createConnection({

    host: 'containers-us-west-41.railway.app',
    user: 'root',
    password: 'nW77xSdsFP5XU5luh8Ux',
    database: 'railway',
    port: '7914'
});

con.connect();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('public'));

app.post('/agregarPersonaje', (req, res)=>{

    let nombre= req.body.nombre
    let posicion= req.body.posicion
    let id = req.body.id

    con.query('INSERT INTO personajes VALUES("'+id+'","'+nombre+'","'+posicion+'")' , (err, respuesta, fields)=>{

        if(err) return console.log("error");

        return res.send('Registro exitoso');


    }
    
    );
});

app.listen(3232, ()=>{

    console.log("Servicio en el puerto 3232");
}

)
app.post('/eliminarPersonaje',(req,res)=>{
    let nombrePer=req.body.usuario;
    let estatusPer= req.body.posicion

    con.query('DELETE FROM personajes where nombre_per=("'+nombrePer+'")',(err,respuesta,field)=>{
        if(err) return console.log('ERROR:',err)

        return res.send(`
        <a href="index.html">Inicio</a>
        <h1>Personaje ${nombrePer} eliminado</h1>`)
    })
});


app.get('/obtenerPersonaje', (req, res)=>{

    con.query('SELECT * FROM personajes',(err,respuesta,field)=>{
        if(err) return console.log('ERROR:',err)

        var userHTML=``
        var i=0
        console.log(respuesta)
        userHTML+=`<a href="index.html">Inicio</a><br><br><br>`
        respuesta.forEach(per =>{
            i++
            userHTML+=`
            <tr><td>${i}</td><td>${per.nombre_per}</td>
            <td>${per.posicion_per}</td></tr>
            
            `
        })

        return res.send(`<table>
            <tr>
                <th>ID: </th>
                <th>Nombre: </th>
                <th>Posicion: </th>
            </tr>
            ${userHTML}
            </table>`)
    })
    }

    );

    app.post('/actualizarPersonaje',(req,res)=>{
        let nombrePer=req.body.oriName;
        let newName=req.body.nomUpdate
    
    
        con.query('UPDATE personajes SET nombre_per=("'+newName+'") WHERE nombre_per=("'+nombrePer+'")',(err,respuesta,field)=>{
            if(err) return console.log('ERROR:',err)
    
            return res.send(`
            <a href="index.html">Inicio</a>
            <h1>Personaje ${nombrePer} cambiado a: <h3>${newName}</h3></h1>
            `)
        })
    });
    
;

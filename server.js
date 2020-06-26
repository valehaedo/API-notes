const express = require ('express');
const MongoClient = require ('mongodb').MongoClient;
const bodyParser = require ('body-parser');
const dbConfig = require('./config/db');

const noteRoutes = require('./app/routes/note_routes');

const app = express();

const port = 8000;


app.use(bodyParser.urlencoded({extended: true}))


const callback = (err, client) => {

    // Obtengo una referencia a la base de datos.
    const db = client.db('node');    

    // Verifico si es un error y termino la funcion imprimiendo un log.
    if(err) return console.log(err);

    // Declaro la ubicacion de mis routes
    noteRoutes(app, db);

    app.listen(port,() => {
        console.log("We are live on " + port); 
    });
};

// Conecto la base de datos a la url de mi base de datos
MongoClient.connect(dbConfig.url, callback);
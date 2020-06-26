const ObjectID = require("mongodb").ObjectID;

module.exports = function(app, db) {
    app.get('/notes/:id', (req, res) =>{
        const id = req.params.id
        const details= {'_id': new ObjectID(id)};
        db.collection('node.js').findOne(details,(err, item)=>{
            if (err) {
                // imprimo el error
                console.log("ERROR", err);

                res.send({'error': 'An error has occured'})
            } else{
                // Si no hay error, en el response, enviamos el resultado.
                res.send(item)
            }  
        })
    });
    app.delete('/notes/:id', (req, res) =>{
        const id = req.params.id;
        const details= {'_id': new ObjectID(id)};
        db.collection('node.js').remove(details,(err, item)=>{
            if (err) {
                // imprimo el error
                console.log("ERROR", err);

                res.send({'error': 'An error has occured'})
            } else{
                // Si no hay error, en el response, enviamos el resultado.
                res.send('Note '+ id + 'deleted!')
            }  
        });
    });

    app.put('/notes/:id', (req, res) =>{
        const id = req.params.id
        const details= {'_id': new ObjectID(id)};
        const note = { 
            text: req.body.noteText, 
            title: req.body.title,
            piePag: req.body.pieDePagina
        };
        db.collection('node.js').update(details, note, (err, item)=>{
            if (err) {
                // imprimo el error
                console.log("ERROR", err);

                res.send({'error': 'An error has occured'})
            } else{
                // Si no hay error, en el response, enviamos el resultado.
                res.send(item)
            }  
        })
    });

    app.post('/notes', (req, res) => {

        // Creo el objeto que voy a guardar en la base de datos
        const note = { 
            text: req.body.noteText, 
            title: req.body.title,
            piePag: req.body.pieDePagina
        };

        console.log("*** BODY",req.body);
        console.log("*** NOTE",note);

        // Guardo los datos en la collection notes
        db.collection('node.js').insert(note, (err, result) =>{
            
            // Si hay error
            if (err) {
                // imprimo el error
                console.log("ERROR", err);

                res.send({'error': 'An error has occured'});
            } else{
                // Si no hay error, en el response, enviamos el resultado.
                res.send(result.ops[0]);
            }

        });
    });
};
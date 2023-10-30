const express = require('express');
const app = express();

require('dotenv').config();
const connection = require('./db/connection.js');

connection.then(()=>{
    const server = app.listen(process.env.PORT, ()=>{
    console.log("Connected and listening");
    });
});

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const Film = require('./models/film.js');

app.post('/api/films', (req,res)=>{
    console.log(req.body);
    let newFilm = new Film(
        {
            title: req.body.title,
            summary: req.body.summary
        }
    );
    newFilm.save()
    .then(result => res.status(201).send(result))
    .catch(error => res.send(error));
    
})

app.get('/api/films', (req,res)=>{
    Film.find({}).exec()
    .then(result => res.send(result))
    .catch(error => res.send('An error occurred!'));

});

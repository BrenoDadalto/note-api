require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const notesRoutes = require('./routes/notesRoutes');
const app = express();

const Note = require("./models/Note");

// middleware leitor de json
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json());

app.use('/note', notesRoutes);

// rota inicial - endpoint
app.get('/', (req, res) => {
    res.json({ message: "Oi, você conseguiu chegar até aqui!" })
})

// entrega uma porta
const DB_USER = process.env.DB_USER
const BD_PASSWORD = encodeURIComponent(process.env.BD_PASSWORD)

mongoose.connect(`mongodb+srv://${DB_USER}:${BD_PASSWORD}@cluster0.1bi4sq6.mongodb.net/note-api?retryWrites=true&w=majority`)
    .then(() => {
        console.log("MongoDB conectado!");
        app.listen(3000);
    })
    .catch((err) => {
        console.log("Erro ao conectar no banco ", err);
    })
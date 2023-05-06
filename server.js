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
const MONGODB_URL = process.env.MONGODB_URL

mongoose.connect(MONGODB_URL)
    .then(() => {
        console.log("MongoDB conectado na porta 3000!");
        app.listen(3000);
    })
    .catch((err) => {
        console.log("Erro ao conectar no banco ", err);
    })
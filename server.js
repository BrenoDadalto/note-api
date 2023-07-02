const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const validateToken = require('./src/middleware/validateToken');
const notesRoutes = require('./src/routes/notesRoutes');
const userRoutes = require('./src/routes/usersRoutes');
const authRoutes = require('./src/routes/authRoutes');

const app = express();

app.use(cors());

// middleware leitor de json
app.use(express.urlencoded({ extended: true }))
app.use(express.json());


// rota inicial - publica
app.get('/', (req, res) => {
    res.send({ message: "Oi, você conseguiu chegar até aqui!" })
})
app.use('/auth', authRoutes);

// rotas privadas
app.use('/note', validateToken, notesRoutes);
app.use('/users', validateToken, userRoutes);

const MONGODB_URL = process.env.MONGODB_URL;

mongoose.connect(MONGODB_URL)
    .then(() => {
        console.log("MongoDB conectado na porta 5400!");
        app.listen(5400);
    })
    .catch((err) => {
        console.log("Erro ao conectar no banco: ", err);
    })
const Note = require("../models/Note");
const User = require("../models/User");
require('dotenv').config();
const jwt = require('jsonwebtoken');

const createNote = async (req, res) => {
    const { title, text } = req.body;
    const authHeaders = req.headers['authorization'];
    const token = authHeaders && authHeaders.split(' ')[1];

    const secret = process.env.SECRET;

    const token_info = jwt.verify(token, secret);
    const user = token_info && await User.findById({ _id: token_info.id })
    const note = { title, text, userId: user._id }

    try {
        await Note.create(note)
        res.status(201).json({ message: "Nota criada com sucesso" })
    } catch (error) {
        res.status(500).json({ error });
    }
}

const getAllNotes = async (req, res) => {
    const authHeaders = req.headers['authorization'];
    const token = authHeaders && authHeaders.split(' ')[1];

    const secret = process.env.SECRET;

    const token_info = jwt.verify(token, secret);
    const user = token_info && await User.findById({ _id: token_info.id })

    try {
        if (user) {
            const note = await Note.find({ userId: user._id }).select('-createdAt -updatedAt -__v');
            res.status(200).json({ message: "Notas buscadas com sucesso", note });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}

const getNote = async (req, res) => {
    const id = req.params.id

    try {
        const note = await Note.findById({ _id: id });
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ error });
    }
}


const updateNote = async (req, res) => {
    const id = req.params.id
    const { title, text } = req.body;

    const note = { title, text }

    try {
        await Note.updateOne({ _id: id }, note)
        res.status(200).json(note)
    } catch (error) {
        res.status(500).json({ error });
    }
}

const deleteNote = async (req, res) => {
    const id = req.params.id

    try {
        await Note.deleteOne({ _id: id })
        res.status(200).json({ message: "Nota deletada com sucesso" })
    } catch (error) {
        res.status(500).json({ error });
    }
}

module.exports = {
    createNote,
    getAllNotes,
    getNote,
    updateNote,
    deleteNote
};
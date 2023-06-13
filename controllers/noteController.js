const Note = require("../models/Note");
const User = require("../models/User");

const createNote = async (req, res) => {
    const { title, text, email } = req.body;

    const userId = await User.findOne({ email })

    const note = { title, text, userId }

    try {
        await Note.create(note)
        res.status(201).json({ message: "Nota criada com sucesso" })
    } catch (error) {
        res.status(500).json({ error });
    }
}

const getAllNotes = async (req, res) => {
    try {
        const note = await Note.find();
        res.status(200).json(note);
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
    getOneNote,
    updateNote,
    deleteNote
};
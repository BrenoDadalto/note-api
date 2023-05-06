const Note = require("../models/Note");

const createNote = async (req, res) => {
    const { title, text } = req.body;

    const note = {
        title,
        text,
    }

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

const getOneNote = async (req, res) => {
    const { id } = req.body

    try {
        const note = await Note.findById({ _id: id });
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ error });
    }
}


const updateNote = async (req, res) => {
    const { id, title, text } = req.body;

    const note = {
        title,
        text,
    }

    try {
        await Note.updateOne({ _id: id }, note)
        res.status(200).json(note)
    } catch (error) {
        res.status(500).json({ error });
    }
}

const deleteNote = async (req, res) => {
    const { id } = req.body;

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
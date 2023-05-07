const User = require("../models/User");

const createUser = async (req, res) => {
    const { email, firstName, lastName, password } = req.body;

    const user = {
        email,
        firstName,
        lastName,
        password,
    }

    try {
        await User.create(user)
        res.status(201).json({ message: "Usuário criado com sucesso" })
    } catch (error) {
        res.status(500).json({ error });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const user = await User.find();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error });
    }
}

const getOneUser = async (req, res) => {
    const id = req.params.id

    const email = req.params.email

    try {
        const user = await User.findOne({ email });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error });
    }
}


const updateUser = async (req, res) => {
    const id = req.params.id
    const { email, firstName, lastName, password } = req.body;

    const user = {
        email,
        firstName,
        lastName,
        password,
    }

    try {
        await User.updateOne({ _id: id }, user)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ error });
    }
}

const deleteUser = async (req, res) => {
    const id = req.params.id;

    try {
        await User.deleteOne({ _id: id })
        res.status(200).json({ message: "Nota deletada com sucesso" })
    } catch (error) {
        res.status(500).json({ error });
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getOneUser,
    updateUser,
    deleteUser
};
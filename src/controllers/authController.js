require('dotenv').config();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    //Validação dos campos
    if (!name) {
        return res.status(422).json({ message: "O nome precisa ser preenchido" })
    }
    if (!email) {
        return res.status(422).json({ message: "O email precisa ser preenchido" })
    }
    if (!password) {
        return res.status(422).json({ message: "A senha precisa ser preenchida" })
    }
    if (password !== confirmPassword) {
        return res.status(422).json({ message: "As senhas não são iguais" })
    }

    //validando se o email já está cadastrado
    const userExist = await User.findOne({ email: email })
    if (userExist) {
        //code 406 not acceptable
        return res.status(406).json({ message: "Email já cadastrado, porfavor utilize outro" })
    }

    //Criando senha com criptografia
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt)

    const body = {
        name,
        email,
        password: passwordHash
    }

    const user = new User(body)
    try {
        await user.save();
        return res.status(201).json({ message: "Usuário cadastrado com sucesso" })
    } catch (error) {
        return res.status(500).json({ message: "Erro no registro de usuário" });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    //Validação dos campos
    if (!email) {
        return res.status(422).json({ message: "O email precisa ser preenchido" })
    }
    if (!password) {
        return res.status(422).json({ message: "A senha precisa ser preenchida" })
    }

    //validando se o usuário existe
    const user = await User.findOne({ email: email })
    if (!user) {
        //code 406 not acceptable
        return res.status(404).json({ message: "Usuário não encontrado" })
    }

    //checando se a senha é a mesma
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
        return res.status(422).json({ message: "Senha inválida" })
    }

    try {
        const secret = process.env.SECRET;
        const token = jwt.sign(
            {
                id: user._id,
            },
            secret,
        )
        return res.status(200).json({ message: "Login realizado com sucesso", token })
    } catch (error) {
        return res.status(500).json({ message: "Erro ao realizar o login, tente novamente mais tarde" });
    }
}

module.exports = {
    register,
    login
};
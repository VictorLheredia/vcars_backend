const userSchema = require('../models/userSchema')
const bcrpt = require("bcrypt");
const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {

    const { name, email, password, confirmpassword } = req.body

    //Validações
    if (!name) {
        return res.status(422).json({ msg: 'O nome é obrigatório' })
    }
    if (!email) {
        return res.status(422).json({ msg: 'O email é obrigatório' })
    }
    if (!password) {
        return res.status(422).json({ msg: 'A senha é obrigatória' })
    }
    if (password !== confirmpassword) {
        return res.status(422).json({ msg: 'As senhas não conferem' })
    }

    //Checando se o usuário existe
    const userExists = await userSchema.findOne({ email: email })
    if (userExists) {
        return res.status(422).json({ msg: 'Email já cadastrado' })
    }

    //Criando password
    const salt = await bcrpt.genSalt(12)
    const passwordHash = await bcrpt.hash(password, salt)

    //Criando user
    const user = new userSchema({ name, email, password: passwordHash })

    try {

        await user.save()

        res.status(201).json({ msg: 'Usuário criado com sucesso!' })


    } catch (err) { return res.status(400).send() }
}

exports.login = async (req, res) => {

    const { email, password } = req.body

    //Validações
    if (!email) {
        return res.status(422).json({ msg: 'O email é obrigatório' })
    }
    if (!password) {
        return res.status(422).json({ msg: 'A senha é obrigatória' })
    }

    //Checando se o usuário existe
    const user = await userSchema.findOne({ email: email })
    if (!user) {
        return res.status(404).json({ msg: 'Usuário não cadastrado' })
    }

    //Chegando password
    const checkPassword = await bcrpt.compare(password, user.password)
    if (!checkPassword) {
        return res.status(422).json({ msg: 'Senha inválida' })
    }

    try {

        const secret = process.env.SECRET
        const token = jwt.sign({ id: user._id }, secret,)
        const id = user._id
        const email = user.email
        const name = user.name

        res.status(200).json({ user: { id, email, name }, token })

    } catch (err) { return res.status(400).send() }
}

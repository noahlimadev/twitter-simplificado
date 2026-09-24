const express = require('express')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const PORT = 3000

const app = express()
app.use(cors())
app.use(express.json())
const JWT_SECRET = 'chave_secreta_padrao_para_testes'
const jwt = require('jsonwebtoken')


function verificarToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(!token){
        return res.status(401).send({message: 'Acesso negado.Token não fornecido'})
    }

    try {
        const usuarioDecodificado = jwt.verify(token, JWT_SECRET);
        req.usuarioLogado = usuarioDecodificado;
        console.log('TESTE PARA CONSOLE', req.usuarioLogado)
        next()
    } catch (error) {
        return res.status(403).send({message: 'Token inválido ou expirado'})
    }

}

// essas senhas são hashs fictícias, equivalentes a 123456
const usuarios = [
    { id: 1, email: 'noah@hotmail.com', senha: '$2b$10$d.wig63sBCPe3QLD8h6VA.lRFpL5PJaPr2eSNoGTxRHjvR0XmQjLW'},
    { id: 2, email: 'vanda@hotmail.com', senha: '$2b$10$d.wig63sBCPe3QLD8h6VA.lRFpL5PJaPr2eSNoGTxRHjvR0XmQjLW'}
]

const postagem = [
    { id: 1, email: 'noah@hotmail.com', texto: 'testando a postagem'}
]

app.get('/',(req,res) => {
    res.send('Servidor online!')
})

app.get('/usuarios', (req,res) => {
    res.send(usuarios)
})

app.get('/postagem',(req,res) => {
    res.send(postagem) 
})

app.post('/register',async (req,res) => {
    const { email, senha} = req.body

    const encontrarEmail = usuarios.find(u => u.email === email)

    if(encontrarEmail){
        return res.status(401).send({message: "Esse usuario ja foi cadastrado!"})
    }

    const senhaCripto = await bcrypt.hash(senha, 10)

    const novo = {
        id: usuarios.length + 1,
        email: email,
        senha: senhaCripto
    }

    usuarios.push(novo)
    res.status(201).send({message: "Usuario criado com sucesso!"})

})

app.post('/login',async (req,res) => {
    
    const { email, senha } = req.body

    const encontrarUsuario =  usuarios.find(u => u.email === email)

    if(!encontrarUsuario){
        return res.status(401).send({message: 'Usuario não encontrado'})
    }

    const senhaValida = await bcrypt.compare(senha, encontrarUsuario.senha)

    if(!senhaValida){
        return res.status(401).send({message: 'Senha inválida'})
    }

    const token = jwt.sign({id: encontrarUsuario.id}, JWT_SECRET, {expiresIn: '7d'})
    return res.status(200).json({email, token})
})  

app.post('/postagem', verificarToken, (req,res) => {
    const { texto } = req.body

    if (!texto) {
        return res.status(401).send({message: "É necessario um texto para post"})
    }

    if(!verificarToken){
        return res.status(401).send({message: 'Temos problemas no seu token'})
    }

    const usuarioAtual = usuarios.find(u => u.id === req.usuarioLogado.id)

    if(!usuarioAtual){
        return res.status(401).send({message: 'Usuario não tem token'})
    }

    const novoPost = {
        id: postagem.length + 1,
        email: usuarioAtual.email,
        texto: texto
    }

    postagem.push(novoPost)
    res.status(201).send(novoPost)

})

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})
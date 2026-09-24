import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Cadastro(){

const [email,setEmail] = useState('')
const [senha,setSenha] = useState('')
const navigate = useNavigate()

async function cadastrar(e) {
  e.preventDefault();

  try {

    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({email, senha})
    })

    const data = await response.json()
    console.log('Dados recebidos', data)
    alert(data.message)
    navigate('/login')

  } catch (error) {
    console.error(`Erro na requisição: ${error}`)

  }

}

  return(
    <div className="center">
      <h1>Cadastro Autenticação!</h1>
      <form onSubmit={cadastrar} className="form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          required
        />
        <input
          type="password"
          value={senha}
          onChange={(e) =>  setSenha(e.target.value)}
          placeholder="*****"
          required
        />
        <button type="submit"  className="botaoCadastro">Cadastro</button>
      </form>
    </div>
  )

}

export default Cadastro
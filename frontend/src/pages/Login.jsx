import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login(){

const navigate = useNavigate()

const [email,setEmail] = useState('')
const [senha,setSenha] = useState('')

async function cadastrar(e) {
  e.preventDefault();

  try {

    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({email, senha})
    })

    if (!response.ok) {
      if(response.status === 401){
        alert('Email ou senha incorretos')
      } else {
        alert('Erro no servidor.')
      }
    }

      const data = await response.json()
      console.log('Dados recebidos', data)
      localStorage.setItem('@App:token', data.token)
      localStorage.setItem('@App:email', JSON.stringify(data.email))
      alert(`Bem vindo de volta ${email}`)
      navigate('/postagem')




  } catch (error) {
    console.error(`Erro na requisição: ${error}`)

  }

}

  return(
    <div className="center">
      <h1>Login Autenticação!</h1>
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
        <button type="submit"  className="botaoCadastro">Logar</button>
      </form>
    </div>
  )

}

export default Login
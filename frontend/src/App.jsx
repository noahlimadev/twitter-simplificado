import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import './App.css'
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Postagem from './pages/FazerPostagem'
import { useEffect, useState } from "react";

function App(){

  const [posts, setPosts] = useState([])
  const [User, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const handleLogout = () => {
    localStorage.removeItem('@App:email')
    localStorage.removeItem('@App:token')
    setUser(null)
    alert('Você foi deslogado')
  }

  useEffect(() => {

    const storageEmail = localStorage.getItem('@App:email')
    const storageToken = localStorage.getItem('@App:token')

    if(storageEmail && storageToken && storageEmail !== 'undefined' && storageToken !== 'undefined'){
      try {
        setUser(JSON.parse(storageEmail))
      } catch (error) {
        console.error(error)
        setUser(null)
        localStorage.removeItem('@App:email')
        localStorage.removeItem('@App:token')
        
      }
    }

    setLoading(false)

    fetch('http://localhost:3000/postagem')
    .then((response) => response.json())
    .then((data) => setPosts(data))
    .catch((error) => console.error('Erro ao buscar dados:', error))
  }, [])

  if(loading){
    return (
      <div>
        Carregando
      </div>
    )
  }

  return(

    <div>

      <nav className="menu">
        <li>Conta: {User}</li>
        <button onClick={handleLogout}>Logout</button>
      </nav>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/cadastro' element={<Cadastro />} />
          <Route path='/postagem' element={<Postagem />} />
        </Routes>
      </BrowserRouter>

      <div className="posts">
        <h3>Postagens</h3>
        {posts.map((p => (
          <div key={p.id}>
            <p style={{color: "yellow"}}>Usuario: {p.email}</p>
            <p>Postagem: {p.texto}</p>
          </div>
        )))}
      </div>

    </div>

  )
}

export default App
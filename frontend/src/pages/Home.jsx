import { Link } from 'react-router-dom'
import './Home.css'

function Home(){

    return(
        <div className='menu-principal'>
            <h1>Escolha</h1>
            <Link to='/login'>Login</Link>
            <Link to='/cadastro'>Cadastro</Link>
            <Link to='/postagem'>Publicar</Link>
        </div>
    )
}

export default Home
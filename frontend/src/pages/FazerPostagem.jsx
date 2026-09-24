import { useState } from "react";

function FazerPostagem(){

    const [texto,setTexto] = useState('')
    const token = localStorage.getItem('@App:token')

    async function postar(e) {

        try {
            const response = await fetch('http://localhost:3000/postagem', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`
                },
                body: JSON.stringify({texto})
            })

            const data = await response.json()
            console.log('Dados recebidos', data)

        } catch (error) {
            console.error('Erro na requisição', error)
        }

    }

    return(
        <div>
            <form onSubmit={postar}>
                <input
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                    type="text"
                    required
                ></input>
                <button type='submit'>Publicar!</button>
            </form>
        </div>
    )

}

export default FazerPostagem
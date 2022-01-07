import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../App';

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'

import { Button } from '../components/Button';

import "../styles/auth.css"

export function NewRoom(){
    const { user } = useContext(AuthContext)

    return(
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp; A ao-vivo</strong>
                <p>Tire duvidas da sua audiencia em tempo real</p>
            </aside>
            <main >
                <div className='main-content'>
                    <img src={logoImg} alt="Letmeask"/>
                    <h1>{user?.name}</h1>
                    <h2>Criar uma nova sala</h2>
                    <form>
                        <input 
                        type="text" 
                        placeholder="Nome da Sala"
                        />
                        <Button type="submit" >Criar sala</Button>
                    </form>
                    <p>Quer entrar em uma sala já existente? <Link to='/'>Click aqui</Link></p>
                </div>
            </main>
        </div>
    )
}
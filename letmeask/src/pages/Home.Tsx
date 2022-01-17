import { useNavigate } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';

import "../styles/auth.css"
import { useAuth } from '../hooks/useAuth';
import { FormEvent, useState } from 'react';
import { database } from '../services/firebase';

export function Home(){
    const Navigate = useNavigate();

    const [roomCode, setRoomCode] = useState("");
 
    const { user, signInWithGoogle} = useAuth()

    async function HandleCreateRoom(){
         
        if(!user){
            await signInWithGoogle();
        }

        Navigate('/rooms/new');
    }

    async function handleJoinRoom(event: FormEvent){
        event.preventDefault();

        if( roomCode.trim()  === "" ){
            return;
        }

        const roomref = await database.ref(`/rooms/${roomCode}`).get();

        if(!roomref.exists()){
            alert("rooms does not exists.");
            return;
        }

        Navigate(`/rooms/${roomCode}`);
    }

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
                    <button className='create-room' onClick={HandleCreateRoom}>
                        <img src={googleIconImg} alt="Logo do google" />
                        Crie sua sala com o Google
                    </button>
                    <div className='separator' >Ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input 
                        type="text" 
                        placeholder="digite o código da sala"
                        onChange={Event => setRoomCode(Event.target.value)}
                        value={roomCode}
                        />
                        <Button type="submit" >Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}
import { useNavigate } from 'react-router-dom';

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';

import "../styles/auth.css"

export function Home(){
    const Navigate = useNavigate();

    function HandleCreateRoom(){
        const provider = new GoogleAuthProvider();

        const auth = getAuth();
        signInWithPopup(auth, provider).then((result) => {
            console.log(result);
            Navigate('/rooms/new');
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            // The signed-in user info.
            const user = result.user;
            // ...
          }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
          });
        
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
                    <form>
                        <input 
                        type="text" 
                        placeholder="digite o código da sala"
                        />
                        <Button type="submit" >Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}
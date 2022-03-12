import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";

import "../styles/room.css";

type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighligted: boolean;
}>

type Question = {
    id: string;
    content: string;
    author: {
        name: string;
        avatar: string;
    }
    isHighligted: boolean;
    isAnswered: boolean;
}

type RoomParams = {
    id: string;
}

export function Room(){

    const {user} = useAuth();
    const params = useParams<RoomParams>();
    const [ newQuestion , setNewQuestion] = useState("")
    const [questions, setQuestions] = useState({})
    const [title, setTitle] = useState('')

    const RoomId = params.id;

    useEffect(() => {
        const roomref = database.ref(`rooms/${RoomId}`);

        roomref.on("value", room => {
            const databaseRoom = room.val()
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions;

            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.content,
                    isHighligted: value.isHighligted,
                    isAnswered: value.isAnswered
                }
            })
         
            setQuestions(parsedQuestions);
            setTitle(databaseRoom.title);
        })
        
    }, [RoomId]);

    async function handleSendQuestion(event: FormEvent){
        event.preventDefault();

        if(newQuestion.trim() === " "){
            return;
        }

        if(!user){
            throw new Error("you must be logged in")
        }

        const question = {
            content: newQuestion,
            author:{
                name: user.name,
                avatar: user.avatar
            },
            isHighligted: false,
            isAnswered: false 
        }

        await database.ref(`rooms/${RoomId}/questions`).push(question);
        setNewQuestion("");


    }

    return( 
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask"/>
                    <RoomCode code={RoomId}></RoomCode>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala : {title}</h1>
                    {parsedQuestions.length > 0 && <span>{Object.keys(questions).length} perguntas</span>}
                </div>

                <form onSubmit={handleSendQuestion}>
                    <textarea   
                    placeholder='O que você quer perguntar?'
                    onChange={event => setNewQuestion(event.target.value)}
                    value={newQuestion}
                    ></textarea>

                    <div className='form-footer'>
                        { user ? (
                            <div className="user-info">
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>

                            </div>
                        ) : (
                            <span >Para enviar uma pergunta, <button>faça seu login</button>.</span>
                        )}
                        <Button type='submit' disabled={!user}>Enviar pergunta</Button>
                    </div>
                </form>

                {JSON.stringify(questions)}
            </main>
        </div>
    );
}

function parsedQuestions(parsedQuestions: any) {
    throw new Error("Function not implemented.");
}

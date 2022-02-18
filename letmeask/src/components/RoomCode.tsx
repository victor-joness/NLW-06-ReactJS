import copyImg from "../assets/images/copy.svg";

import "../styles/room-code.css"

type RoomCodeProps = {
    code : string | undefined;
} 
export function RoomCode(props: RoomCodeProps){

    function copyRoomCodeToClipboard(){
        if(props.code === undefined){
            props.code = "id invalido"
        }
        navigator.clipboard.writeText(props.code)
    }

    return(
        <button className="room-code" onClick={copyRoomCodeToClipboard}>
            <div> <img src={copyImg} alt="copy-room-code" /></div>
            <span>Sala #{props.code}</span>
        </button>
    );
}

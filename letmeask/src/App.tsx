//import { Home } from "./pages/Home";
import { BrowserRouter , Routes, Route,} from "react-router-dom";

import { createContext, useState, useEffect } from "react";

import { Home } from "./pages/Home"
import { NewRoom } from "./pages/NewRoom";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { auth } from "./services/firebase";

type User = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextType );

function App() {
  const [user , setUser] = useState<User>();

  useEffect(()=>{
    
    onAuthStateChanged(getAuth(), (user) =>{
      if(user){
        const { displayName, photoURL, uid } = user;

        if(!displayName || !photoURL){
          throw new Error('Missing information from Google acount ')
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })
  }, [])

  async function signInWithGoogle(){
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const result = await signInWithPopup(auth, provider)

      if(result.user){
        const { displayName, photoURL, uid } = result.user;

        if(!displayName || !photoURL){
          throw new Error('Missing information from Google acount ')
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
  }

  return (
    <BrowserRouter>
      <AuthContext.Provider value={ {user, signInWithGoogle} }>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms/new" element={<NewRoom />} />
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;

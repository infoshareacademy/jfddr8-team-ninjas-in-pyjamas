import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState, useContext } from "react";
import { LoginStatus } from "../providers/Auth";
import { firebaseAuth } from "..";
import { useNavigate } from "react-router-dom";


function Login(): JSX.Element {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setIsLogged } = useContext(LoginStatus);

  const navigate = useNavigate();

  const handleLogin = async() => {
    try{
      await signInWithEmailAndPassword(firebaseAuth, login, password);
      navigate('/home');
      setIsLogged(true);
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   try {
    await createUserWithEmailAndPassword(firebaseAuth, login, password);
    setIsLogged(true);
    navigate('/home');
   } catch({code}){
    if(code === 'auth/email-already-in-use') {
      handleLogin();
    }
    console.log(code);
   };
   
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        name="login"
        id="login"
        placeholder="login"
        onChange={(e) => setLogin(e.target.value)}
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Login</button>
    </form>
  );
}

export default Login;
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState, useContext } from "react";
import { firebaseAuth } from "../main";
import { useNavigate } from "react-router-dom";
import { globalContext } from "../Context/Context";
import "../Styles/login.scss";


function Login(): JSX.Element {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setIsLogged } = useContext(globalContext);

  const navigate = useNavigate();

  const handleLogin = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
      await signInWithEmailAndPassword(firebaseAuth, login, password);
      navigate('/');
      setIsLogged(true);
      
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="container-login">
      <form onSubmit={handleLogin}>
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
    </div>
  );
}

export default Login;
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
    <div className="login-app">
      <div className="login-form">
        <form onSubmit={handleLogin} >
          <div className="input-container">
            <label>Username</label>
            <input
              type="text"
              name="login"
              id="login"
              // placeholder="login"
              onChange={(e) => setLogin(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label>Password</label>
            <input
              type="password"
              name="password"
              id="password"
              // placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="button-container"><button>Login</button></div>
          
        </form>
      </div>
    </div>
  );
}

export default Login;
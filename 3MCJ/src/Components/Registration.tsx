import React, { useState, useContext } from "react";
import { globalContext } from "../Context/Context";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth, firebaseDb } from "../main";
import { setDoc, doc,  } from "firebase/firestore";
import "../Styles/registration.scss";

enum userType {
  Customer = "customer",
  Seller = "seller",
}

type UserData = {
  city: string;
  email: string;
  password: string;
  name: string;
  surname: string;
  confirmPassword: string;
  userType: userType;
  shoppingCartItems:any[];
  shoppingCartValue:number;
  rating?: number[]
};
const initialUser = {
  city: "",
  email: "",
  password: "",
  name: "",
  surname: "",
  confirmPassword: "",
  userType: userType.Customer,
  shoppingCartItems: [],
  shoppingCartValue: 0,
};

function Registration() {
  const [user, setUser] = useState<UserData>(initialUser);
  const { isLogged, setIsLogged } = useContext(globalContext);
  const navigate = useNavigate();
  const userData = useState<UserData>(initialUser);
  const [error, setError] = useState<string>('');


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(user.password !== user.confirmPassword) {
      alert("Hasła się nie zgadzają");
      setError("Hasła się nie zgadzają");
      return;
    }
    try {      
      await createUserWithEmailAndPassword(firebaseAuth, user.email, user.password);
      const {email} = firebaseAuth.currentUser!;
      await setDoc(doc(firebaseDb, 'Users' , `${email}`),{
        city:user.city,
        email:user.email,
        name: user.name,
        surname: user.surname,
        userType: user.userType,
        shoppingCartItems:user.shoppingCartItems,
        shoppingCartValue:user.shoppingCartValue
      })
      
      setIsLogged(true);
      navigate("/home");
    } catch ({ code }) {
      console.log(code);
    }
  };

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement >) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
    console.log(user)
  };
  return (
    <div className="registration-app">
      <div className= "registration-form">
        <form onSubmit={handleSubmit} name="registration_form">
          <div className="input-container">
            <input type="email" name="email" onChange={handleInputChange} required value={user.email} placeholder="Email" />
          </div>
          <div className="input-container">
          <input name="password" type="password"onChange={handleInputChange} required value={user.password} placeholder="Hasło" />
          </div>
          <div className="input-container">
          <input name="confirmPassword" type="password" onChange={handleInputChange} required value={user.confirmPassword} placeholder="Potwierdź Hasło"/>
          </div>
          {error && (<div className="error-message">{error}</div>)}
          <div className="input-container">
          <input type="name" name="name" onChange={handleInputChange} required value={user.name} placeholder="Imię" />
          </div>
          <div className="input-container">
          <input type="surname" name="surname" onChange={handleInputChange} required value={user.surname} placeholder="Nazwisko" />
          </div>
          <div className="input-container">
          <input type="city" name="city" onChange={handleInputChange} required value={user.city} placeholder="Miasto" />
          </div>
        <select className="input-container" onChange={handleInputChange} name="userType" id="products">
          <option value={userType.Customer}>Klient</option>
          <option value={userType.Seller}>Sprzedawca</option>
        </select>
        <div className="submit-container">
          <input type="submit" value={"Załóż konto"} />
        </div>
        </form>
      </div>
    </div>
  );
}

export default Registration;

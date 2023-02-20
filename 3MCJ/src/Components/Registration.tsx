import React, { useState, useContext } from "react";
import { globalContext } from "../Context/Context";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth, firebaseDb } from "../main";
import { setDoc, doc,  } from "firebase/firestore";

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
  shoppingCartValue:number
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
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    <div className="container">
      <header>Twoje dane</header>
      <form onSubmit={handleSubmit} name="registration_form">
      <input name="email" onChange={handleInputChange} required value={user.email} placeholder="Email" />
      <input name="password" type="password"onChange={handleInputChange} required value={user.password} placeholder="Hasło" />
      <input name="confirmPassword" type="password" onChange={handleInputChange} required value={user.confirmPassword} placeholder="Potwierdź Hasło"/>
      <input name="name" onChange={handleInputChange} required value={user.name} placeholder="Imię" />
      <input name="surname" onChange={handleInputChange} required value={user.surname} placeholder="Nazwisko" />
      <input name="city" onChange={handleInputChange} required value={user.city} placeholder="Miasto" />
      <select onChange={handleInputChange} name="userType" id="products">
        <option value={userType.Customer}>Klient</option>
        <option value={userType.Seller}>Sprzedawca</option>
      </select>
        <input type="submit" value={"Załóż konto"} />
      </form>
    </div>
  );
}

export default Registration;

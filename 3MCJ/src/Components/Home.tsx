import { globalContext } from "../Context/Context";
import { useContext, useState } from "react";
import SellersList from "./SellersList";
import "../Styles/home.scss";
import { Dna } from "react-loader-spinner";
import { useEffect } from "react";
import Logo from "../assets/Logo/TCJLogo.png";

function Home() {
  const {
    setIsLogged,
    isLogged,
    searchingLocation,
    setSearchingLocation,
    searchingCategory,
    setSearchingCategory,
    readDivValue,
    setReadDivValue,
    spinnerHome,
  } = useContext(globalContext);
  const [locationValue, setLocationValue] = useState<string>("");
  const [categoryValue, setCategoryValue] = useState<string>("");

  useEffect(() => {
    setSearchingLocation(locationValue);
    setSearchingCategory(categoryValue);
  }, [locationValue, categoryValue]);

  return (
    <div className="home">
      <div className="search-section">
        <img className="shop-logo" src={Logo} alt="shop logo" />
        <form>
          <select
            defaultValue={"Wybierz miasto"}
            onChange={(e) => {
              setLocationValue(e.target.value);
            }}
            name="location"
            id="location"
          >
            <option disabled>Wybierz miasto</option>
            <option value="Gdynia">Gdynia</option>
            <option value="Sopot">Sopot</option>
            <option value="Gdańsk">Gdańsk</option>
            <option value="">Całe Trójmiasto</option>
          </select>
          <select
            defaultValue={"Wybierz produkt"}
            onChange={(e) => {
              setCategoryValue(e.target.value);
            }}
            name="products"
            id="products"
          >
            <option disabled>Wybierz produkt</option>
            <option value="Wyroby Mięsne">Wyroby Mięsne</option>
            <option value="Wyroby Rybne">Wyroby Rybne</option>
            <option value="Wyroby Cukiernicze">Wyroby Cukiernicze</option>
            <option value="Nabiał">Nabiał</option>
            <option value="Wyroby Garmażeryjne">Wyroby Garmażeryjne</option>
            <option value="">Wszystkie Kategorie</option>
          </select>
        </form>
      </div>
      <Dna
        visible={spinnerHome}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
      <SellersList />
    </div>
  );
}

export default Home;

import "../Styles/outerPage.scss";
import { globalContext } from "../Context/Context";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import mapa1 from "../assets/Logo/mapa1.png";
import Logo from "../assets/Logo/TCJLogo.png";

function OuterPage() {
  const { shoppingCartValue } = useContext(globalContext);
  const today = new Date();
  const tomorrow = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1
  );
  const day = tomorrow.getDate();
  const month = tomorrow.getMonth() + 1;
  const year = tomorrow.getFullYear();

  return (
    <div className="outer-page-div">
      <div className="outer-page-box-div">
        <img className="outer-logo" src={Logo} alt="shop logo" />
        <div className="content-outer-div">
          <h2>PODSUMOWANIE ZAKUPÓW</h2>
          <div>
            <p>Kwota do zapłaty :</p> {shoppingCartValue + " zł (z VAT)"}
          </div>
          <div>
            <p>Sposób dostawy:</p> <p>Odbiór własny w punkcie dystrybucji</p>
          </div>
          <div>
            <p>Miejsce odbioru:</p> <p>Galeria Bałtycka, Gdańsk</p>
          </div>
          <div>
            <p>Data odbioru:</p>{" "}
            <p>
              <strong>
                {day}.{month}.{year}
              </strong>{" "}
              w godzinach 09:00-18:00
            </p>
          </div>
          <div>
            <p>Płatność:</p> <p>Przy odbiorze</p>
          </div>
        </div>
        <div className="map-image">
          <a
            href="https://www.google.com/maps/place/Galeria+Ba%C5%82tycka/@54.382982,18.597918,17z/data=!3m1!4b1!4m5!3m4!1s0x46fd74ea79e3fd01:0x3cd7c4eada1b8ed4!8m2!3d54.382982!4d18.600112"
            target="_blank"
          >
            {" "}
            <img src={mapa1}></img>
          </a>
        </div>
      </div>
    </div>
  );
}

export default OuterPage;

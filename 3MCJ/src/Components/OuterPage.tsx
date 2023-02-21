import "../Styles/outerPage.scss";
import { globalContext } from "../Context/Context";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

function OuterPage() {
  const { shoppingCartValue } = useContext(globalContext);

  //   const directToGoogleMaps = () => {
  //     window.location.href = "https://www.google.com/maps/place/Galeria+Ba%C5%82tycka/@54.382982,18.597918,17z/data=!3m1!4b1!4m5!3m4!1s0x46fd74ea79e3fd01:0x3cd7c4eada1b8ed4!8m2!3d54.382982!4d18.600112";

  //   };

  return (
    <div className="outer-page-div">
      <div className="outer-page-box-div">
        <div className="content-outer-div">
        <h2>PODSUMOWANIE ZAKUPÓW</h2>
          <div>
         <p>Kwota do zapłaty:</p> {shoppingCartValue + " zł"}
          </div>
          <div>
            <p>Sposób dostawy:</p> <p>Odbiór własny w punkcie dystrybucji</p>
          </div>
          <div>
            <p>Miejsce odbioru:</p> <p>Galeria Bałtycka, Gdańsk</p>
          </div>
          <div>
            <p>Płatność:</p> <p>gotówką</p>
          </div>
        </div>
        <div className="map-image" >
          <a
            href="https://www.google.com/maps/place/Galeria+Ba%C5%82tycka/@54.382982,18.597918,17z/data=!3m1!4b1!4m5!3m4!1s0x46fd74ea79e3fd01:0x3cd7c4eada1b8ed4!8m2!3d54.382982!4d18.600112"
            target="_blank"
          > <img
          src="src/assets/Logo/mapa1.png"
        ></img>
          </a>
        </div>
      </div>
    </div>
  );
}

export default OuterPage;

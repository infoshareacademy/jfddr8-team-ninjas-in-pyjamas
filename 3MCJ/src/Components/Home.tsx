import { useNavigate } from "react-router-dom";
function Home() {
  
  const navigate = useNavigate();


  return (
    <div>
      <div>
        <button onClick={() => navigate('/login')}>Log in </button>
      </div>
      <label htmlFor="location">Lokalizacja:</label>
      <select name="location" id="location">
        <option value="Gdynia">Gdynia</option>
        <option value="Sopot">Sopot</option>
        <option value="Gdańsk">Gdańsk</option>
      </select>
      <label htmlFor="products">Kategoria produktu:</label>
      <select name="products" id="products">
        <option value="Wyroby-Miesne">Wyroby Mięsne</option>
        <option value="Wyroby-Rybne">Wyroby Rybne</option>
        <option value="nabiał">Nabiał</option>
        <option value="miód">Miód</option>
        <option value="Wyroby Alkoholowe">Wyroby Alkoholowe</option>
      </select>
    </div>
  );
}

export default Home;

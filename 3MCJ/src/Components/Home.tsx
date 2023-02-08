import React from 'react'
// const productsOptions = [
//   { value: 'mięso', label: 'Mięso' },
//   { value: 'nabiał', label: 'Nabiał' },
//   { value: 'wypieki', label: 'Wypieki' },
//   { value: 'miody', label: 'Miody' },
// ]

// const locationOptions = [
//   { value: 'Gdańsk', label: 'Gdańsk' },
//   { value: 'Sopot', label: 'Sopot' },
//   { value: 'Gdynia', label: 'Gdynia' }
// ]

function Home() {
  return (
    <div>
      <label for="location">Lokalizacja:</label>
      <select name="location" id="location">
        <option value="Gdańsk">Gdańsk</option>
        <option value="Sopot">Sopot</option>
        <option value="Gdynia">Gdynia</option>
      </select>
      <label for="products">Kategoria produktu:</label>
      <select name="products" id="products">
        <option value="ryby">Ryby</option>
        <option value="mięso">Mięso</option>
        <option value="nabiał">Nabiał</option>
      </select>
    </div>
  )
}

export default Home

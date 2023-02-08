import React from 'react'
import Select from 'react-select'


const productsOptions = [
  { value: 'mięso', label: 'Mięso' },
  { value: 'nabiał', label: 'Nabiał' },
  { value: 'wypieki', label: 'Wypieki' },
  { value: 'miody', label: 'Miody' },
]

const locationOptions = [
  { value: 'Gdańsk', label: 'Gdańsk' },
  { value: 'Sopot', label: 'Sopot' },
  { value: 'Gdynia', label: 'Gdynia' }
]

function Home() {
  return (
    <div>
      <
      <Select options={locationOptions} />
      <Select options={productsOptions} />
    </div>
  )
}

export default Home

import React from 'react'



export const globalContext = React.createContext<>

function Context((props: PropsWithChildren): JSX.Element ) {
  return (
   
      <globalContext.Provider value = {{}}>
        {props.children}
      </globalContext.Provider>

  )
}

export default Context

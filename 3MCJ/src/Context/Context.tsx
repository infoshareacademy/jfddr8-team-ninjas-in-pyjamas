import React from 'react'

type GlobalVariablesType = {
  
}

type PropsWithChildren = {
  children: JSX.Element;
}

export const globalContext = React.createContext<GlobalVariablesType>( {} as GlobalVariablesType )

function Context(props: PropsWithChildren): JSX.Element  {
  return (
      <globalContext.Provider value = {{}}>
        {props.children}
      </globalContext.Provider>
  )
}

export default Context

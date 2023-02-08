import React, {useState} from 'react'


type GlobalVariablesType = {
  isLogged: boolean;
  setIsLogged: (isLogged: boolean) => void;
}

type PropsWithChildren = {
  children: JSX.Element;
}

export const globalContext = React.createContext<GlobalVariablesType>( {} as GlobalVariablesType )

function Context(props: PropsWithChildren): JSX.Element  {
  const [isLogged, setIsLogged] = useState(false);
  return (
      <globalContext.Provider value = {{isLogged, setIsLogged}}>
        {props.children}
      </globalContext.Provider>
  )
}

export default Context

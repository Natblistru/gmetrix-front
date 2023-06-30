import { useState, createContext } from "react";

export const RaspunsuriCtx = createContext();

export default function Raspunsuri({children}){
  const [raspunsuri, setRaspunsuri] = useState([]);
  const add = (raspuns) => {
    setRaspunsuri([...raspunsuri, {
      ...raspuns
    }])
  }
  const update = (newRaspuns) => {
    setRaspunsuri(raspunsuri.map((raspuns)=> {
      if(raspuns.id === newRaspuns.id) {
        return {
          ...newRaspuns
        }
      }
      else {
        return raspuns
      }
    }))
  } 
  const del =(id) => {
    setRaspunsuri(raspunsuri.filter((raspuns)=> raspuns.id !==id))
  }
  return (
    <RaspunsuriCtx.Provider value={{
      raspunsuri,
      add,
      update,
      del
    }}>
      {children}
    </RaspunsuriCtx.Provider>
  )
}





















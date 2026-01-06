import { createContext, useState } from "react";

export const counterContext = createContext()

export default function CounterContextProvider({children}) {
    const [counter, setcounter] = useState(0)
  return (
    <counterContext.Provider value={{counter,setcounter}}>
        {children}
    </counterContext.Provider>
  )
}

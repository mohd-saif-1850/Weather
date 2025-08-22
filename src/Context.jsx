import { createContext, useContext } from "react"
import { useState, useEffect } from "react"

const Theme = createContext()

export const ThemeProvider = ({children}) =>{
    const [mode,setMode] = useState(false)

    useEffect(() => {
    const html = document.documentElement
    if(mode){
      html.classList.add('dark')
    }
    else{
      html.classList.remove('dark')
    }
  },[mode])

  return(
    <Theme.Provider value={{mode,setMode}}>
        {children}
    </Theme.Provider>
  )

}

export const useTheme = () => useContext(Theme);
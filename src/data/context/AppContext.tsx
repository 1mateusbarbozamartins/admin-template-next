import { createContext, useEffect, useState, ReactNode } from "react";

interface AppContextProps {
    tema?: string
    alternarTema?: () => void
}

const AppContext = createContext<AppContextProps>({})

interface AppProviderProps {
    children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
    const [tema, setTema] = useState('dark')

    function alternarTema() {
        const novoTema = tema === '' ? 'dark' : ''
        setTema(novoTema)
        localStorage.setItem('tema', novoTema)
    }

    useEffect(() => {
        const temaSalvo = localStorage.getItem('tema')
        setTema(temaSalvo ?? '')
    }, [])

    return (
        <AppContext.Provider value={{ tema, alternarTema }}>
            {children}  
        </AppContext.Provider>
    )
}

export default AppContext;

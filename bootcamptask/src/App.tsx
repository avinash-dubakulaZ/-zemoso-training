import React from 'react'
import './App.css'
import { createTheme, ThemeProvider } from '@mui/material'
import MyntraCard from './Components/Molecules/MyntraCard/Index'
function App() {
    const mytheme = createTheme({
        typography: {
            fontFamily: 'Montserrat',
        },
    })
    return (
        <>
            <ThemeProvider theme={mytheme}>
                <MyntraCard></MyntraCard>
            </ThemeProvider>
        </>
    )
}

export default App

import React from 'react'
import logo from './logo.svg'
import './App.css'
import ContactCard from './Components/Molecules/ContactCard/Index'
import { Typography } from '@mui/material'
import AddContact from './Components/Molecules/AddContact/Index'
function App() {
    return (
        <div>
            <ContactCard></ContactCard>
            <AddContact></AddContact>
        </div>
    )
}

export default App

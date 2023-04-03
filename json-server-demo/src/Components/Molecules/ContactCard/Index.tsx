import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
const ContactCard = () => {
    interface row {
        id: string
        name: string
        number: string
    }
    const [modify, setmodify] = useState(0)
    const handleChange = () => setmodify(modify + 1)
    const [contact, setcontact] = useState<row[]>([])
    const handleDelete = async (id: string) => {
        await axios.delete(`http://localhost:4000/contacts/${id}`)
        handleChange()
    }
    useEffect(() => {
        getdata()
    }, [modify])
    const getdata = async () => {
        axios.get('http://localhost:4000/contacts').then((response) => {
            setcontact(response.data)
        })
    }
    return (
        <>
            <Box sx={{ position: 'absolute', left: '500px', width: '400px' }}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: 'primary.main' }}>
                                <TableCell align='center'>Id</TableCell>
                                <TableCell align='center'>Name</TableCell>
                                <TableCell align='center'>Contact</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {contact.map((row: row) => (
                                <TableRow key={row.id}>
                                    <TableCell align='center'>
                                        {row.id}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {row.name}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {row.number}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant='contained'
                                            color='secondary'
                                            onClick={() => {
                                                handleDelete(row.id.toString())
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
}

export default ContactCard

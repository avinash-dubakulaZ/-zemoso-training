import { Button, TextField } from '@mui/material'
import { Box, Stack } from '@mui/system'
import axios from 'axios'
import React, { useState } from 'react'
const AddContact = () => {
    const [id, setid] = useState<string>('')
    const [name, setname] = useState<string>('')
    const [number, setnumber] = useState<string>('')
    const idChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setid(e.target.value)
    }

    const nameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setname(e.target.value)
    }

    const numberChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setnumber(e.target.value)
    }

    const mainBox = {
        width: '400px',
        height: '400px',
        borderRadius: '20px',
        alignItems: 'center',
        border: '2px solid black',
        justifyContent: 'space-evenly',
    }

    interface row {
        id: string
        name: string
        number: string
    }
    const addContact = async () => {
        await axios.post<row[]>('http://localhost:4000/contacts', {
            id: id,
            name: name,
            number: number,
        })
        // handleChange(id, name, number)
    }
    const updateContact = async () => {
        // try {
        //     await axios.put<row[]>(`http://localhost:4000/contacts/${id}`, {
        //         id: id,
        //         name: name,
        //         number: number,
        //     })
        // } catch (error) {
        //     if (axios.isAxiosError(error)) {
        //         console.log('error message: ', error.message)
        //         return error.message
        //     } else {
        //         console.log('unexpected error: ', error)
        //         return 'An unexpected error occurred'
        //     }
        // }
        return axios
            .put(`http://localhost:4000/contacts`, {
                id: id,
                name: name,
                number: number,
            })
            .then(async (response) => {
                return await response.data
            })
            .catch((error) => {
                console.log(error)
            })
    }
    return (
        <form>
            <Stack sx={mainBox}>
                <TextField
                    type='text'
                    label='Id'
                    required
                    value={id}
                    onChange={idChangeHandler}
                />
                <TextField
                    type='text'
                    label='Name'
                    required
                    value={name}
                    inputProps={{ minLength: 3 }}
                    onChange={nameChangeHandler}
                />
                <TextField
                    type='text'
                    label='Phone Number'
                    required
                    value={number}
                    inputProps={{ minLength: 10 }}
                    onChange={numberChangeHandler}
                />
                <Box sx={{ display: 'flex', gap: '20px' }}>
                    <Button
                        variant='contained'
                        color='primary'
                        type='submit'
                        onClick={addContact}
                    >
                        Add Contact
                    </Button>
                    <Button
                        variant='contained'
                        color='primary'
                        // type='submit'
                        onClick={updateContact}
                    >
                        Change Contact
                    </Button>
                </Box>
            </Stack>
        </form>
    )
}
export default AddContact

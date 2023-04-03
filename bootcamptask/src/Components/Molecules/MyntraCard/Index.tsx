import { Box, createTheme, Typography } from '@mui/material'
import MyntraIcon from '../../../Assets/Images/myntra.svg'
import BikeIcon from '../../../Assets/Images/bike.svg'
import BusIcon from '../../../Assets/Images/bus.svg'
import CarIcon from '../../../Assets/Images/car.svg'
import TrainIcon from '../../../Assets/Images/train.svg'
import MoreIcon from '../../../Assets/Images/more.svg'
import Image from '../../Atoms/Image/Index'
import Text from '../../Atoms/Text/Index'
import { Stack, ThemeProvider } from '@mui/system'
const Index = () => {
    const mytheme = createTheme({
        typography: {
            fontFamily: 'Montserrat',
        },
    })
    const mainbox = {
        position: 'absolute',
        width: '571px',
        height: '159px',
        borderRadius: '12px',
        background: '#FFFFFF',
    }
    const textBox = { position: 'absolute', top: '16px', left: '90px' }
    const imageBox = {
        position: 'absolute',
        top: '16px',
        left: '19px',
        padding: '5px',
    }
    const bottomBox = {
        position: 'absolute',
        top: '119px',
        left: '90px',
        width: '462px',
        height: '24px',
        display: 'flex',
        justifyContent: 'space-between',
    }
    const iconGroup = {
        width: '144px',
        height: '24px',
        display: 'flex',
        gap: '16px',
    }
    const moreBox = {
        position: 'absolute',
        top: '16px',
        right: '19px',
    }
    return (
        <ThemeProvider theme={mytheme}>
            <Box sx={mainbox}>
                <Box sx={imageBox}>
                    <Image imagedata={MyntraIcon} alt='MyntraIcon'></Image>
                </Box>
                <Box sx={textBox}>
                    <Text variant='h6' children='User Experience Designer' />
                    <Stack>
                        <Text
                            variant='caption'
                            children='Myntra'
                            sx={{ color: '#FF725E' }}
                        />
                        <Text
                            variant='caption'
                            children='Hitech city, Hyderabad - 500072'
                            sx={{ color: '#656E66' }}
                        />
                    </Stack>
                </Box>
                <Box sx={moreBox}>
                    <Image imagedata={MoreIcon} alt='MoreIcon'></Image>
                </Box>
                <Box sx={bottomBox}>
                    <Box sx={iconGroup}>
                        <Image imagedata={BikeIcon} alt='BikeIcon'></Image>
                        <Image imagedata={BusIcon} alt='BusIcon'></Image>
                        <Image imagedata={CarIcon} alt='CarIcon'></Image>
                        <Image imagedata={TrainIcon} alt='TrainIcon'></Image>
                    </Box>
                    <Text variant='caption'>36 min ago</Text>
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default Index

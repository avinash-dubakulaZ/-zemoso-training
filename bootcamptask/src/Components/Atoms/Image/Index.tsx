import { Box } from '@mui/material'
import './Index.css'
interface Image {
    imagedata: string
    alt: string
}
const Index = ({ imagedata, alt }: Image) => {
    return <img src={imagedata} alt={alt}></img>
}
export default Index

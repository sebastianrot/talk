import { useNavigate, useLocation } from "react-router-dom"
import { Button } from "@chakra-ui/react"
import { FaFire, FaArrowAltCircleUp, FaThumbtack } from "react-icons/fa"

const Home = () => {
    let navigate = useNavigate()
    let location = useLocation()
    return(
        <div style={{display: 'flex', marginTop: '10px'}}>
        <Button variant={(location.pathname==='/home' || location.pathname==='/feed')?'solid':'ghost'} onClick={()=>navigate('/feed')} marginRight='10px' leftIcon={<FaThumbtack/>}>Feed</Button>
        <Button variant={location.pathname==='/hot'?'solid':'ghost'} onClick={()=>navigate('/hot')} marginRight='10px' leftIcon={<FaFire/>}>Hot</Button>
        <Button variant={location.pathname==='/best'?'solid':'ghost'} onClick={()=>navigate('/best')} leftIcon={<FaArrowAltCircleUp/>}>Best</Button>
        </div>
    )
}

export default Home
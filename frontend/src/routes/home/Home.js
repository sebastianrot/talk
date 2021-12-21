import { useNavigate } from "react-router-dom"
import { Button } from "@chakra-ui/react"
import { FaFire, FaArrowAltCircleUp } from "react-icons/fa"

const Home = () => {
    let navigate = useNavigate()
    return(
        <div style={{display: 'flex', marginTop: '10px'}}>
        <Button variant='ghost' onClick={()=>navigate('/hot')} marginRight='10px' leftIcon={<FaFire/>}>Hot</Button>
        <Button onClick={()=>navigate('/best')} leftIcon={<FaArrowAltCircleUp/>}>Best</Button>
        </div>
    )
}

export default Home
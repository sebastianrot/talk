import { useHistory } from "react-router-dom"
import { Button } from "@chakra-ui/react"
import { FaFire, FaArrowAltCircleUp } from "react-icons/fa"

const Home = () => {
    let history = useHistory()
    return(
        <div style={{display: 'flex', marginTop: '10px'}}>
        <Button variant='ghost' onClick={()=>history.push('/hot')} marginRight='10px' leftIcon={<FaFire/>}>Hot</Button>
        <Button onClick={()=>history.push('/best')} leftIcon={<FaArrowAltCircleUp/>}>Best</Button>
        </div>
    )
}

export default Home
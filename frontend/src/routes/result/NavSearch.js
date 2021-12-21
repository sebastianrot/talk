import { useNavigate, useLocation } from "react-router-dom"
import {Tabs, TabList, Tab} from '@chakra-ui/react'

const NavSearch = () => {
    let navigate = useNavigate()
    const location = useLocation()

    const tabs = () => {
        if(location.pathname === `/search/users`) return 0
        if(location.pathname === `/search/groups`) return 1
    }
    
    return(
        <article style={{margin: 'auto', marginTop: '10px'}}>
            <Tabs variant='soft-rounded' color='#1071fe' index={tabs()}>
            <TabList>
                <Tab onClick={()=>navigate(`/search/users${location.search}`)}>Użytkownicy</Tab>
                <Tab onClick={()=>navigate(`/search/groups${location.search}`)}>Grupy</Tab>
            </TabList>
            </Tabs>
        </article>
    )
}

export default NavSearch
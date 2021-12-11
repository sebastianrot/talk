import { useHistory, useLocation } from "react-router-dom"
import {Tabs, TabList, Tab} from '@chakra-ui/react'

const NavSearch = () => {
    let history = useHistory()
    const location = useLocation()

    const tabs = () => {
        if(location.pathname === `/search/users`) return 0
        if(location.pathname === `/search/groups`) return 1
    }
    
    return(
        <article style={{margin: 'auto', marginTop: '10px'}}>
            <Tabs variant='soft-rounded' color='#1071fe' index={tabs()}>
            <TabList>
                <Tab onClick={()=>history.push(`/search/users${location.search}`)}>Użytkownicy</Tab>
                <Tab onClick={()=>history.push(`/search/groups${location.search}`)}>Grupy</Tab>
            </TabList>
            </Tabs>
        </article>
    )
}

export default NavSearch
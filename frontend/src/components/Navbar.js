import './Navbar.css';
import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Menu, MenuButton, MenuList, MenuItem, MenuGroup} from '@chakra-ui/menu';
import { Button } from '@chakra-ui/button';
import { Stack } from "@chakra-ui/react"
import { FaBell } from "react-icons/fa";
import Search from './search/Search'
import AuthContext from '../context/AuthContext';
import LogOut from './LogOut';
import { ReactComponent as Logo} from './svg/logo.svg'
import url from './urlSettings';

const Navbar = () => {
    let history = useHistory();
    const {logged, myUser} = useContext(AuthContext)
    const [count, setCount] = useState(0)

    useEffect(()=>{
        if(logged){
        fetch(`${url.serverUrl}/api/notifications/count`, {
            credentials: 'include'
        })
        .then(res=>res.json())
        .then(data=>{
            setCount(data)
        }).catch(err=>setCount(0))
    }
    },[logged])

    const iflogin = (logged) => {
        if(logged) return(
            <Stack direction="row" spacing={4} align="center">
            <Button variant='ghost' size="md" onClick={()=>history.push('/notifications')}><FaBell/>{count}</Button>
            <Menu>
                <MenuButton as={Button} bg='#1071fe' color='#fff' _hover={{background: '#0c5bce'}} _active={{background: '#0c5bce'}}>
                    Profile
                </MenuButton>
                <MenuList>
                    <MenuGroup>
                    <MenuItem onClick={()=>history.push(`/user/${myUser.username}`)}>Konto</MenuItem>
                    <MenuItem onClick={()=>history.push(`/user/${myUser.username}/groups`)}>Grupy</MenuItem>
                    <MenuItem>Ustawienia</MenuItem>
                    <MenuItem><LogOut/></MenuItem>
                    </MenuGroup>
                </MenuList>
                </Menu>
                </Stack>
        )
        return (
            <Stack direction="row" spacing={4} align="center">
            <Button variant="ghost" onClick={()=>history.push('/login')}>Sign in</Button>
            <Button bg='#1071fe' color='#fff' size="md" _hover={{background: '#0c5bce'}} onClick={()=>history.push('/register')}>Sign up</Button>
            </Stack>
        )
    }   

    return(
        <header className='nav-header'>
            <nav>
            <Logo onClick={()=>history.push('/')} style={{cursor: 'pointer'}}/>
                <Search/>
                {iflogin(logged)}
            </nav>
        </header>
    )
}

export default Navbar;

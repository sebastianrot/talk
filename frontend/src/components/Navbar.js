import './Navbar.css';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, MenuButton, MenuList, MenuItem, MenuGroup, Button, Stack, IconButton, Badge} from '@chakra-ui/react';
import { FaBell, FaCompass, FaUserAlt } from "react-icons/fa";
import Search from './search/Search'
import AuthContext from '../context/AuthContext';
import LogOut from './LogOut';
import useWindowSize from './hook/useWindowSize';
import NavbarMobile from './NavbarMobile';
import { ReactComponent as Logo} from './svg/logo.svg'
import url from './urlSettings';

const Navbar = () => {
    let navigate = useNavigate()
    const {logged, myUser} = useContext(AuthContext)
    const [count, setCount] = useState(0)
    const {width} = useWindowSize()

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
            <div style={{position: 'relative'}}>
            <IconButton variant='ghost' size="md" icon={<FaBell fontSize='18px'/>} onClick={()=>navigate('/notifications')}/>
            {count===0 ? null : <Badge colorScheme='red' borderRadius='50%' position='absolute' right='0px' top='3px'>{count}</Badge>}
            </div>
            <IconButton variant="ghost" icon={<FaCompass fontSize='18px'/>} onClick={()=>navigate('/groups/discover')}/>
            <Menu>
                <MenuButton as={IconButton} icon={<FaUserAlt fontSize='18px'/>} backgroundColor='#fff'/>
                <MenuList>
                    <MenuGroup>
                    <MenuItem onClick={()=>navigate(`/user/${myUser.username}`)}>Konto</MenuItem>
                    <MenuItem onClick={()=>navigate(`/user/${myUser.username}/groups`)}>Grupy</MenuItem>
                    <MenuItem onClick={()=>navigate(`/groups/create`)}>Stwórz grupe</MenuItem>
                    <MenuItem onClick={()=>navigate(`/settings`)}>Ustawienia</MenuItem>
                    <MenuItem><LogOut/></MenuItem>
                    </MenuGroup>
                </MenuList>
                </Menu>
                </Stack>
        )
        return (
            <Stack direction="row" spacing={4} align="center">
            <Button variant="ghost" onClick={()=>navigate('/login')}>Zaloguj</Button>
            <Button bg='#1071fe' color='#fff' size="md" _hover={{background: '#0c5bce'}} onClick={()=>navigate('/register')}>Zarejestruj</Button>
            </Stack>
        )
    }   

    return(
        <header className='nav-header'>
            <nav>
            <Logo onClick={()=>navigate('/')} style={{cursor: 'pointer'}}/>
                {width >= '768' &&
                <><Search/>
                {iflogin(logged)}</>}

                 {(width < '768' && width > '576') && <div style={{display: 'flex'}}>
                    <Search/>
                {iflogin(logged)}</div>}

                {width <= '576' && <Search/>}
            </nav>
            {(width <= '576' && logged) && <NavbarMobile count={count} myUser={myUser}/>}
        </header>
    )
}

export default Navbar;

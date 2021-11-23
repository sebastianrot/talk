import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Search from './search/Search'
import AuthContext from '../context/AuthContext';
import LogOut from './LogOut';
import { ReactComponent as Logo} from './svg/logo.svg'
import url from './urlSettings';

const Navbar = () => {

    const {logged, myUser} = useContext(AuthContext)

    const [count, setCount] = useState(0)
    const [click, setClick] = useState(false)

    const handleClick = () => {
        setClick(!click)
    }

    useEffect(()=>{
        fetch(`${url.serverUrl}/api/notifications/count`, {
            credentials: 'include'
        })
        .then(res=>res.json())
        .then(data=>{
            setCount(data)})
    },[])

    return(
        <header className='nav-header'>
            <nav>
            <Logo/>
                <Link to='/'></Link>
                <Search/>
                <Link to={`/groups`}>grupy</Link>
                <Link to={`/notifications`}>{`Powiadomienia: ${count}`}</Link>
                {logged ?
                <div onClick={handleClick}>
                    Konto
                 {click ? <div>
                     <span>notifications</span>
                     <div className='account-dropdown'>
                     <Link to={`/user/${myUser.id}`}>konto</Link>
                     <LogOut/>
                     </div>
                </div> : null} 
                </div>
                 : <button>Zaloguj się</button>}
            </nav>
        </header>
    )
}

export default Navbar;

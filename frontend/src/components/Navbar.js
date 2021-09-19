import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Search from './search/Search'
import AuthContext from '../context/AuthContext';
import LogOut from './LogOut';

const Navbar = () => {

    const {logged, myUser} = useContext(AuthContext)

    const [click, setClick] = useState(false)

    const handleClick = () => {
        setClick(!click)
    }

    return(
        <header className='nav-header'>
            <nav>
                <Link to='/'>logo</Link>
                <Search/>
                <Link to={`/groups`}>grupy</Link>
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

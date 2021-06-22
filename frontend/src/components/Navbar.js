import { useEffect, useState } from 'react';
import './Navbar.css';

const Navbar = () => {
    const [test, setTest] = useState()

    useEffect(() => {
        fetch('http://localhost:5000/api/myprofile', {credentials: 'include'})
        .then(data => data.json())
        .then(data => setTest(data))
    }, [])
    console.log(test)
    return(
        <header className='nav-header'>
            <nav>
                <span>logo</span>
                <input type='search' placeholder='Search for users' className='nav-search'/>
                <div>konto</div>
            </nav>
        </header>
    )
}

export default Navbar;

import {Navigate} from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import Loading from './Loading';

const PrivateRoute = ({children}) => {
    const {logged, isLoading} = useContext(AuthContext)

    if(isLoading) {
    return <Loading/>
    }

   return logged ? children : <Navigate to='/login'/> 

}


export default PrivateRoute
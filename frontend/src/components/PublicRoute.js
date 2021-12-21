import {Navigate} from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import Loading from './Loading';

const PublicRoute = ({children}) => {
    const {logged, isLoading} = useContext(AuthContext)

    if(isLoading) {
        return <Loading/>
    }
    return logged ? <Navigate to='/home'/> : children

}

export default PublicRoute
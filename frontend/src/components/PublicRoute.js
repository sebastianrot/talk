import {Route, Redirect} from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import Loading from './Loading';

const PublicRoute = ({component: Component, ...rest}) => {
    const {logged, isLoading} = useContext(AuthContext)

    if(isLoading) {
        return <Loading/>
    }
    return(
        <Route {...rest} render={()=>(
            logged ? <Redirect to='/home'/> : <Component/>
        )}/>
    )
}

export default PublicRoute
import {Route, Redirect} from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import Loading from './Loading';

const PrivateRoute = ({component: Component, ...rest}) => {
    const {logged, isLoading} = useContext(AuthContext)

    if(isLoading) {
    return <Loading/>
    }

   return(
       <Route {...rest} render={()=>(
           logged ? <Component/> : <Redirect to='/login'/> 
       )}/>
   )
}


export default PrivateRoute
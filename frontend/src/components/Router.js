import {BrowserRouter ,Route, Switch} from 'react-router-dom';
import Home from '../routes/home/Home';
import Login from '../routes/login/ContentLogin';
import Register from '../routes/register/MainRegister';
import Profile from '../routes/profile/Profile';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

const Router = () => {
    return(
      <BrowserRouter>
        <Switch>
            <PrivateRoute path='/' exact component={Home}/>
            <PublicRoute path='/login' component={Login}/>
            <PublicRoute path='/register' component={Register}/>
            <Route path='/profile/:id' component={Profile}/>
            <Route render={() => <span>404</span>} />
        </Switch>
      </BrowserRouter>
    )
}

export default Router
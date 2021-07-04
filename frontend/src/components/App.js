import {BrowserRouter} from 'react-router-dom';
import {AuthContextProvider} from '../context/AuthContext';
import { ProfileContextProvider } from '../context/ProfileContext';
import Navbar from './Navbar';
import Router from './Router';

const App = () => {
  return (
    <AuthContextProvider>
    <ProfileContextProvider>
    <BrowserRouter>
    <Navbar/>
    <Router/>
    </BrowserRouter>
    </ProfileContextProvider>
    </AuthContextProvider>
  );
}

export default App;


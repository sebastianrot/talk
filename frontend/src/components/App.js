import {BrowserRouter} from 'react-router-dom';
import {AuthContextProvider} from '../context/AuthContext';
import Navbar from './Navbar';
import Router from './Router';

const App = () => {
  return (
    <AuthContextProvider>
    <BrowserRouter>
    <Navbar/>
    <Router/>
    </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;


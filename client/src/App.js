import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';

import routes from './utils/routes';
import Home from './pages/Home';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Header from './components/header/Header';

import GlobalContext from './utils/context/GlobalContext';

function App() {
  const [isAuth, setIsAuth] = useState('false');

  return (
    <GlobalContext.Provider value={{
      isAuth,
      setIsAuth,
    }}>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path={routes.HOME} element={<Home />} />
          <Route path={routes.LOGIN} element={<Login />} />
          <Route path={routes.REGISTER} element={<Registration />} />
        </Routes>
      </Container>
    </GlobalContext.Provider>
  );
}

export default App;

import React, { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { IntlProvider } from 'react-intl';

import { themeSettings } from './utils/theme/theme';
import { checkAuthUser, removeAuthData } from './store/action-creators/auth';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import * as Pages from './pages/pages';

import enMessages from './utils/localizations/en.json'
import ruMessages from './utils/localizations/ru.json'
const messages = {
  'en': enMessages,
  'ru': ruMessages,
};

function App() {
  const dispatch = useDispatch();
  const { mode, lang } = useSelector(state => state.options);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  const token = localStorage.getItem('token');
  useEffect(() => {
    if (token) {
      dispatch(checkAuthUser());
    } else {
      dispatch(removeAuthData());
    }
    // eslint-disable-next-line
  }, [token]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <IntlProvider locale={lang} messages={messages[lang]}>
          <CssBaseline />
          <Header />
          <Container maxWidth={false} sx={{ maxWidth: 1440 }} >
            <Routes>
              <Route path="/" element={<Pages.Home />} />
              <Route path="/login" element={<Pages.Login />} />
              <Route path="/register" element={<Pages.Registration />} />
              <Route path="/users/:userId" element={<Pages.Account />} />
              <Route path="/collections/:collectionId" element={<Pages.Collection />} />
              <Route path="/collections/:collectionId/items/:itemId" element={<Pages.Item />} />
              <Route path="/admin" element={<Pages.Admin />} />
              <Route path="/search/:value" element={<Pages.SearchResult />} />
              <Route path="*" element={<Pages.NotFound />} />
            </Routes>
          </Container>
          <Footer />
        </IntlProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

// import React from 'react';
import Header from '../components/Layouts/header';
import { renderRoutes } from '../config/routes';
import { Provider } from 'react-redux';
import store from '../store';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../utils/theme';
import '../app.css';
import SideBar from '../components/Layouts/sidebar';
import { makeStyles } from '@mui/styles';
import { BrowserRouter } from 'react-router-dom';
import { addUserName } from '../store/actions';
import LocalStorage from '../services/localStorage';
import jwtDecode from 'jwt-decode';

const styles = makeStyles({
  root: {
    ' body,div,body,header': {
      backgroundColor: ' #181a20 !important',
    },
  },
});
function App() {
  const classes = styles();
  const renderLayouts = () => {
    if (window.location.pathname === '/') return null;
    return (
      <>
        <Header />
        <SideBar />
      </>
    );
  };
  const token = LocalStorage.getItem('token');

  if (token) {
    const name = jwtDecode(LocalStorage.getItem('token'))?.name;
    store.dispatch(addUserName(name));
  }

  // const theme = LocalStorage.getItem('theme');
  // let blackThemeClassName;
  // if (theme && theme === 'black') {
  //   blackThemeClassName = 'theme--black';
  // }

  return (
    <div className={`app ${classes.root}`}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <BrowserRouter>
            {renderLayouts()}
            <div className={`my-app ${''}`}>{renderRoutes()}</div>
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;

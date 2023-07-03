import React from 'react';
import { AppBar } from '@mui/material';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { Typography, useMediaQuery } from '@mui/material';
import { Button } from '@mui/material';
import LocalStorage from '../../../services/localStorage';
import store from '../../../store';
import { setSidebar } from '../../../store/actions';

const useStyles = makeStyles({
  root: {
    height: '40px',
    boxShadow: 'none !important',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 16px',
  },
  text: {
    maxWidth: '1110px',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 16px',
  },
});

const Header = () => {
  const classes = useStyles();
  const name = useSelector((state) => state?.name);
  const sideBarIsOpen = useSelector((state) => state?.sideBarOpen);
  const matches = useMediaQuery('(min-width:800px)');

  return (
    <AppBar className={classes.root} position='fixed'>
      <div className={classes.text}>
        {name && <Typography>نام کاربری : {name}</Typography>}
        {!matches && (
          <Button
            style={{ color: 'white' }}
            onClick={() => {
              store.dispatch(setSidebar(!sideBarIsOpen));
            }}
          >
            لیست خدمات
          </Button>
        )}
        <Button
          style={{ color: 'white' }}
          onClick={() => {
            LocalStorage.removeItem('token');
            LocalStorage.removeItem('userType');
            // navigate('/');
            window.location.reload();
          }}
        >
          خروج
        </Button>
      </div>
    </AppBar>
  );
};
export default Header;

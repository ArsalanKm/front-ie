import { useState } from 'react';
import { TextField, Paper, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router';
import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import { http } from '../../services/http';
import LocalStorage from '../../services/localStorage';

const useStyles = makeStyles({
  root: {
    background: 'red',
    position: 'absolute',
    left: '50%',
    top: '40%',
    transform: 'translate(-50%, -50%)',
    width: '350px',
    height: '300px',
    display: 'flex',
    flexDirection: 'column',
    padding: '30px',
  },
  input: {
    direction: 'rtl',
    marginBottom: '12px !important',
    '& input': { direction: 'rtl !important' },
  },
  select: {
    width: '140px',
    height: '40px',
    margin: '16px 0',
  },
  button: {
    // marginTop: "16px"
  },
});

const Home = () => {
  const [state, setState] = useState({
    id: undefined,
    password: undefined,
    type: 'student',
  });
  const [isValid, setIsValid] = useState(false);
  const userType = LocalStorage.getItem('userType');
  const tokent = LocalStorage.getItem('token');
  const navigate = useNavigate();
  useEffect(() => {
    if (state.id !== undefined && state.id?.length === 8) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [state.id]);

  useEffect(() => {
    if (state.password !== undefined && state.password.length > 8) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [state.password]);

  const onInputChange = (event, value) => {
    setState((prevState) => ({ ...prevState, [value]: event.target.value }));
  };

  const handleLoginSubmit = () => {
    http
      .sendRequest(
        `${state.type === 'teacher' ? 'professor' : state.type}/login`,
        {
          method: 'post',
          body: {
            universityId: state.id,
            password: state.password,
          },
        }
      )
      .then(({ data }) => {
        LocalStorage.setItem('token', data?.token);
        LocalStorage.setItem('userType', state?.type);
        if (data?.token) navigate(`/dashboard/${state.type}`);
      });
  };
  useEffect(() => {
    if (userType && tokent) {
      window.location.replace(`/dashboard/${userType}`);
    }
  }, []);

  const classes = useStyles();
  if (userType) {
    return null;
  }
  return (
    <Paper className={classes.root}>
      <TextField
        onChange={(event) => onInputChange(event, 'id')}
        className={classes.input}
        label='شماره کاربری'
        placeholder='شماره کاربری'
      />
      <TextField
        onChange={(event) => onInputChange(event, 'password')}
        className={classes.input}
        label='رمز عبور'
        type='password'
        placeholder='رمز عبور'
      />

      <Select
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        value={state.type}
        label='Age'
        className={classes.select}
        onChange={(event) => onInputChange(event, 'type')}
      >
        <MenuItem value={'student'}>دانشجو</MenuItem>
        <MenuItem value={'teacher'}>استاد</MenuItem>
        <MenuItem value={'admin'}>مدیر IT</MenuItem>
        <MenuItem value={'manager'}>مدیر آموزشی</MenuItem>
      </Select>
      <Button
        className={classes.button}
        onClick={handleLoginSubmit}
        // disabled={!isValid}
      >
        وارد شوید
      </Button>
    </Paper>
  );
};

export default Home;

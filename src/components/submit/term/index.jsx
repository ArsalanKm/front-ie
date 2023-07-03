import { useState } from 'react';
import { TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material';
import { http } from '../../../services/http';
import { useEffect } from 'react';

const inputs = [
  { name: 'name', placeholder: 'نام', label: 'نام' },
  // {
  //   name: 'preRegistrationCourses',
  //   placeholder: 'دروس پیش ثبت نامی',
  //   label: 'دروس پیش ثبت نامی',
  // },
  // {
  //   name: 'termCourses',
  //   placeholder: 'دروس ترمی',
  //   label: 'دروس ترمی',
  // },
];

const styles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '16px',
    gap: '20px',
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
  },
  submit: {
    width: '200px !important',
    background: '#ccc !important',
  },
});

const TermSubmit = () => {
  const [state, setState] = useState();

  const handleSubmit = () => {
    http
      .sendRequest('manager/term', { method: 'post', body: { ...state } })
      .then((res) => res?.success && setState({}));
  };

  const onInputChange = (event, value) => {
    setState((prevState) => ({ ...prevState, [value]: event.target.value }));
  };

  useEffect(() => {}, [state]);
  const classes = styles();
  return (
    <>
      <div className={classes.root}>
        {inputs.map((el) => {
          return (
            <TextField
              value={(state && state[el?.name]) || ''}
              className={classes.input}
              key={el.name}
              onChange={(event) => onInputChange(event, el.name)}
              label={el.label}
              placeholder={el.placeholderi}
              type={el.type}
            />
          );
        })}
      </div>
      <div className={classes.buttonContainer}>
        <Button className={classes.submit} onClick={handleSubmit}>
          ثبت ترم
        </Button>
      </div>
    </>
  );
};

export default TermSubmit;

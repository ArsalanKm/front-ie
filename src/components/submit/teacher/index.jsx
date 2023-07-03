import { useState } from 'react';
import { TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material';
import { http } from '../../../services/http';
import { useEffect } from 'react';

const inputs = [
 { name: 'name', placeholder: 'نام', label: 'نام' },
 { name: 'familyName', placeholder: ' نام خانوادگی', label: 'نام خانوادگی' },
 { name: 'password', placeholder: 'رمز عبور', label: 'رمز', type: 'password' },
 {
  name: 'universityId',
  placeholder: 'شماره دانشجویی',
  label: 'شماره دانشجویی',
 },
 {
  name: 'email',
  placeholder: 'ایمیل',
  label: 'ایمیل',
 },
 {
  name: 'phoneNumber',
  placeholder: 'شماره تماس',
  label: 'شماره تماس',
 },

 {
  name: 'faculty',
  placeholder: 'دانشکده',
  label: 'دانشکده',
 },
 {
  name: 'field',
  placeholder: 'رشته',
  label: 'رشته',
 },
 {
  name: 'rank',
  placeholder: 'سطح',
  label: 'سطح',
 },
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

const SubmitTeacher = () => {
 const [state, setState] = useState();

 const handleSubmit = () => {
  http
   .sendRequest('admin/professor', { method: 'post', body: { ...state } })
   .then((res) => res?.success && setState({}));
 };

 const onInputChange = (event, value) => {
  setState((prevState) => ({ ...prevState, [value]: event.target.value }));
 };

 useEffect(() => { }, [state]);
 console.log(state);
 const classes = styles();
 return (
  <>
   <div className={classes.root}>
    {inputs.map((el) => {
     return (
      <TextField
       value={state && state[el?.name]}
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
     ثبت استاد
    </Button>
   </div>
  </>
 );
};

export default SubmitTeacher;

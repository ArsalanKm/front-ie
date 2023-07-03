import { useState } from 'react';
import { TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material';
import { http } from '../../../services/http';
import { useEffect } from 'react';
import DropDown from '../../dropdown';

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
    name: 'educationDegree',
    placeholder: 'مدرک تحصیلی',
    label: 'مدرک تحصیلی',
  },
  { name: 'enteranceYear', placeholder: 'سال ورود', label: 'سال ورود' },
  {
    name: 'semester',
    placeholder: 'ترم تحصیلی',
    label: 'ترم تحصیلی',
  },
  {
    name: 'average',
    placeholder: 'معدل',
    label: 'معدل',
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
    name: 'leadTeacher',
    placeholder: 'استاد راهنما',
    label: 'استاد راهنما',
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

const SubmitStudent = () => {
  const [state, setState] = useState();
  const [teacherData, setTeacherData] = useState([]);
  const [termDAta, setTermData] = useState([]);

  const handleSubmit = () => {
    http
      .sendRequest('admin/student', { method: 'post', body: { ...state } })
      .then((res) => res?.success && setState({}));
  };

  const onInputChange = (event, value) => {
    console.log('semester');
    setState((prevState) => ({ ...prevState, [value]: event.target.value }));
  };
  const getTeacherData = () => {
    http
      .sendRequest(`admin/professors`, { method: 'get' })
      .then((res) => setTeacherData(res?.data?.data));
  };

  const getAdminData = () => {
    http
      .sendRequest(`admin/terms`, { method: 'get' })
      .then((res) => setTermData(res?.data?.data));
  };

  useEffect(() => {
    getTeacherData();
    getAdminData();
  }, []);
  const classes = styles();
  return (
    <>
      <div className={`${classes.root} responsive-container`}>
        {inputs.map((el) => {
          if (el.name === 'leadTeacher') {
            return (
              <DropDown
                onChange={(event) => onInputChange(event, 'teacher')}
                key={el.name}
                value={state?.teacher}
                type={el.name}
                data={teacherData}
                placeholder='معلم را انتخاب کنید'
              />
            );
          }
          if (el.name === 'semester') {
            return (
              <DropDown
                onChange={(event) => onInputChange(event, 'semester')}
                key={el.name}
                value={state?.semester}
                type={el.name}
                data={termDAta}
                placeholder='ترم را انتخاب کنید'
              />
            );
          }

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
          ثبت دانشجو
        </Button>
      </div>
    </>
  );
};

export default SubmitStudent;

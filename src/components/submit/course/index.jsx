import { useState } from 'react';
import { TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material';
import { http } from '../../../services/http';
import { useEffect } from 'react';
import DropDown from '../../dropdown';

const inputs = [
  { name: 'name', placeholder: 'نام', label: 'نام' },
  { name: 'value', placeholder: 'تعداد واحد', label: 'تعداد واحد' },
  { name: 'preRequests', placeholder: 'پیش نیازها', label: 'پیش نیازها' },
  { name: 'sameRequests', placeholder: 'هم نیازها', label: 'هم نیازها' },
  { name: 'field', placeholder: 'رشته', label: 'رشته' },
  {
    name: 'classTime',
    placeholder: 'تایم کلاس',
    label: 'تایم کلاس',
    type: 'datetime-local',
  },
  {
    name: 'examTime',
    placeholder: 'تایم امتحان',
    label: 'تایم امتحان',
    type: 'datetime-local',
  },
  {
    name: 'examLocation',
    placeholder: 'مکان امتحان کلاس',
    label: 'مکان امتحان کلاس',
  },
  {
    name: 'teacher',
    placeholder: 'استاد درس',
    label: 'استاد درس',
  },
  {
    name: 'capacity',
    placeholder: 'گنجایش',
    label: 'گنجایش',
  },
  { name: 'semester', placeholder: 'ترم کلاس', label: 'ترم' },
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
  input: {
    width: '200px !important',
  },
});

const CourseSubmit = () => {
  const [state, setState] = useState();
  const [teacherData, setTeacherData] = useState([]);
  const [coursesData, setCoursesData] = useState([]);
  const [termData, setTermData] = useState([]);

  const handleSubmit = () => {
    http
      .sendRequest('manager/course', { method: 'post', body: { ...state } })
      .then((res) => res?.success && setState({}));
  };

  const getTeacherData = () => {
    http
      .sendRequest(`manager/professors`, { method: 'get' })
      .then((res) => setTeacherData(res?.data.data));
  };
  const getCoursesData = () => {
    http
      .sendRequest(`manager/courses`, { method: 'get' })
      .then((res) => setCoursesData(res?.data.data));
  };
  const onInputChange = (event, value) => {
    setState((prevState) => ({ ...prevState, [value]: event.target.value }));
  };

  const gettermData = () => {
    http
      .sendRequest(`manager/terms`, { method: 'get' })
      .then((res) => setTermData(res?.data?.data));
  };
  useEffect(() => {
    getTeacherData();
    getCoursesData();
    gettermData();
  }, []);
  const classes = styles();
  return (
    <>
      <div className={classes.root}>
        {inputs.map((el) => {
          if (el.name === 'teacher') {
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
          if (el.name === 'preRequests') {
            return (
              <DropDown
                onChange={(event) => onInputChange(event, 'preRequests')}
                key={el.name}
                value={state?.preRequests}
                type={el.name}
                data={coursesData}
                placeholder='پیش نیاز را انتخاب کنید'
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
                data={termData}
                placeholder=' ترم را انتخاب کنید'
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
          ثبت درس
        </Button>
      </div>
    </>
  );
};

export default CourseSubmit;

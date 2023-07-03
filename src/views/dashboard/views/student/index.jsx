import { useState } from 'react';
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { http } from '../../../../../services/http';
import Container from '../../../../components/container';

const useStyles = makeStyles({
  listItem: {
    width: '200px',
    borderRadius: '4px',
  },
  button: {
    color: '#1976d2',
    padding: '8px',
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: 'rgba(25, 118, 210, 0.04)',
    },
  },
});

const StudentDashboard = () => {
  const { id } = useParams();
  const classes = useStyles();
  const [data, setData] = useState();
  useEffect(() => {
    http.sendRequest(`/student/term/${id}/`, { method: 'get' }).then((res) => {
      setData(res.data.data);
    });
  }, [id]);

  return (
    <>
      <Container header={`${data?.name} ترم`}>
        <Link
          to={`/dashboard/manager/term/${id}/registration_courses`}
          className={classes.button}
        >
          دروس ثبت نامی
        </Link>
        <Link
          to={`/dashboard/manager/term/${id}/registration_courses`}
          className={classes.button}
        >
          دروس پیش ثبت نامی
        </Link>
        <Link
          to={`/dashboard/manager/term/${id}/requests/preregistration_courses`}
          className={classes.button}
        >
          درخواست های پیش ثبت نامی
        </Link>
        <Link
          to={`/dashboard/student/term/${id}/preregistration_courses`}
          className={classes.button}
        >
          درخواست های ثبت نامی
        </Link>
        <Link
          to={`/dashboard/student/term/${id}/term_courses`}
          className={classes.button}
        >
          درس های این ترم
        </Link>
      </Container>
    </>
  );
};

export default StudentDashboard;

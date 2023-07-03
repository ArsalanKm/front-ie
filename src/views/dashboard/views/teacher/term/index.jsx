import { useState } from 'react';
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { http } from '../../../../../services/http';
import Container from '../../../../../components/container';

const useStyles = makeStyles({
  root: {
    padding: '0 40px',
    marginTop: '8px',
  },

  container: {
    width: 'calc(100% - 240px)',
    minHeight: '100%',
    marginTop: '50px',
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid',
  },

  listContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '20px',
    marginTop: '40px',
    justifyContent: 'center',
  },

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

const TeacherTermIdPage = () => {
  const { id, clientType } = useParams();
  const classes = useStyles();
  const [data, setData] = useState();
  useEffect(() => {
    http
      .sendRequest(`/${clientType}/term/${id}/`, { method: 'get' })
      .then((res) => {
        setData(res.data.data);
      });
  }, [id]);

  return (
    <>
      <Container header={`${data?.name} ترم`}>
        <Link
          to={`/dashboard/${clientType}/term/${id}/requests/preregistration_requests`}
          className={classes.button}
          state={{ name: data?.name }}
        >
          درخواست های پیش ثبت نامی
        </Link>
        <Link
          to={`/dashboard/${clientType}/term/${id}/requests/registration_requests`}
          className={classes.button}
          state={{ name: data?.name }}
        >
          درخواست های ثبت نامی
        </Link>
      </Container>
    </>
  );
};

export default TeacherTermIdPage;

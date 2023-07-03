import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Container from '../container';
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import CourseInfo from '../course-info';
import { http } from '../../services/http';
import { theme } from '../../utils/theme';

const useStyles = makeStyles({
  listItem: {
    width: '200px',
    borderRadius: '4px',
    backgroundColor: theme.palette.primary.main,
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

const TermRequests = () => {
  const { clientType, id, requestType } = useParams();
  const location = useLocation();
  const classes = useStyles();
  const [data, setData] = useState();

  const getData = () => {
    if (requestType === 'preregistration_requests') {
      http
        .sendRequest(
          `/${
            clientType === 'teacher' ? 'professor' : clientType
          }/term/${id}/preregistrations`,
          {
            method: 'get',
          }
        )
        .then((res) => setData(res.data.data));
    } else if (requestType === 'registration_requests') {
      http
        .sendRequest(
          `/${
            clientType === 'teacher' ? 'professor' : clientType
          }/term/${id}/registrations`,
          {
            method: 'get',
          }
        )
        .then((res) => setData(res.data.data));
    }
  };
  useEffect(() => {
    getData();
  }, [requestType]);

  const configs = {
    registration_requests: ' درخواست های  ثبت نامی ',
    preregistration_requests: 'درخواست های پیش ثبت نامی',
  };

  const handleDelete = (course) => {
    console.log(course);
    if (requestType === 'preregistration_requests') {
      http
        .sendRequest(`/${clientType}/term/${id}/preregister/${course}`, {
          method: 'delete',
        })
        .then(() => getData());
    } else if (requestType === 'registration_requests') {
      http
        .sendRequest(`/${clientType}/term/${id}/register/${course}`, {
          method: 'delete',
        })
        .then(() => getData());
    }
  };

  const renderForStudents = () => {
    return (
      <>
        {data &&
          data.length > 0 &&
          data?.map((el) => (
            <Card
              color='primary'
              className={classes.listItem}
              key={el}
              variant='outlined'
            >
              {
                <>
                  <CardContent>
                    <Typography component='h2'>
                      {configs[requestType]}
                    </Typography>
                    {el.courses.map((course) => (
                      <CourseInfo key={course.id} el={course} />
                    ))}
                  </CardContent>
                  <CardActions>
                    {clientType === 'student' && (
                      <>
                        <Button
                          onClick={() => {
                            handleDelete(el.id);
                          }}
                          size='small'
                        >
                          حذف
                        </Button>
                      </>
                    )}
                  </CardActions>
                </>
              }
            </Card>
          ))}
      </>
    );
  };

  const handleCofirm = (id) => {
    http
      .sendRequest(
        `/${
          clientType === 'teacher' ? 'professor' : clientType
        }/registration/${id}`,
        {
          method: 'put',
        }
      )
      .then(() => getData());
  };
  const renderForOthers = () => {
    return (
      <>
        {data &&
          data.length > 0 &&
          data?.map((el) => (
            <Card className={classes.listItem} key={el} variant='outlined'>
              {
                <>
                  <CardContent>
                    <Typography component='h2'>
                      {configs[requestType]}
                      {el?.student?.name}
                    </Typography>
                    {el?.courses?.map((el) => (
                      <CourseInfo key={el.id} el={el} />
                    ))}
                  </CardContent>
                  <CardActions>
                    {clientType !== 'student' && (
                      <>
                        <Button
                          onClick={() => {
                            handleCofirm(el.id);
                          }}
                          size='small'
                        >
                          {clientType === 'teacher'
                            ? el.teacherConfirm
                              ? 'تایید شده'
                              : 'تایید'
                            : el.managerConfirm
                            ? ' تایید شده'
                            : 'تایید نشده'}
                        </Button>
                      </>
                    )}
                  </CardActions>
                </>
              }
            </Card>
          ))}
      </>
    );
  };
  return (
    <>
      <Container header={` ${configs[requestType]}  ${location?.state?.name}`}>
        {clientType === 'student' && renderForStudents()}
        {clientType !== 'student' && renderForOthers()}
      </Container>
    </>
  );
};

export default TermRequests;

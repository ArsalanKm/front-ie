import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardActions, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { getUserInfo } from '../../utils';
import { http } from '../../services/http';
import { useEffect } from 'react';
import CourseInfo from '../course-info';
import Container from '../container';

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

const TermCourses = () => {
  const { id, coursesType, clientType } = useParams();
  const classes = useStyles();
  const [data, setData] = useState();

  const getData = () => {
    if (coursesType === 'term_courses') {
      http
        .sendRequest(`/student/term_courses`, {
          method: 'get',
        })
        .then((res) => {
          setData(res.data?.data);
        });
    } else {
      http
        .sendRequest(
          `/${
            clientType === 'teacher' ? 'professor' : clientType
          }/term/${id}/${coursesType}`,
          {
            method: 'get',
          }
        )
        .then((res) => {
          setData(res.data?.data);
        });
    }
  };

  const configs = {
    registration_courses: 'درسهای ثبت نامی',
    preregistration_courses: 'درس های پیش ثبت نامی',
    term_courses: 'دروس این ترم',
  };

  const checkIfUserHasRegisterd = (el) => {
    const { id } = getUserInfo();
    console.log(id);
    if (coursesType === 'registration_courses') {
      if (el?.registerStudents?.find((el) => el.toString() === id)) {
        return true;
      }
    } else if (coursesType === 'preregistration_courses') {
      if (el?.preRegisterStudents?.find((el) => el.toString() === id)) {
        return true;
      }
    }

    return false;
  };

  const handleDelete = (course) => {
    if (coursesType === 'preregistration_courses') {
      http
        .sendRequest(`/${clientType}/term/${id}/preregistration/${course}`, {
          method: 'delete',
        })
        .then(() => getData());
    } else if (coursesType === 'registration_courses') {
      http
        .sendRequest(`/${clientType}/term/${id}/register/${course}`, {
          method: 'delete',
        })
        .then(() => getData());
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleRegister = (course) => {
    if (coursesType === 'preregistration_courses') {
      http
        .sendRequest(`/${clientType}/term/${id}/preregister/${course}`, {
          method: 'post',
        })
        .then(() => getData());
    } else if (coursesType === 'registration_courses') {
      http
        .sendRequest(`/${clientType}/term/${id}/register/${course}`, {
          method: 'post',
        })
        .then(() => getData());
    }
  };

  const handleStudentDelete = (course) => {
    if (coursesType === 'preregistration_courses') {
      http
        .sendRequest(`/${clientType}/term/${id}/preregister/${course}`, {
          method: 'delete',
        })
        .then(() => getData());
    } else if (coursesType === 'registration_courses') {
      http
        .sendRequest(`/${clientType}/term/${id}/register/${course}`, {
          method: 'delete',
        })
        .then(() => getData());
    }
  };

  return (
    <>
      <Container header={configs[coursesType]}>
        {data?.map((el) => (
          <Card className={classes.listItem} key={el.id} variant='outlined'>
            {
              <>
                <CardContent>
                  <CourseInfo el={el} />
                </CardContent>
                <CardActions>
                  {coursesType === 'term' && (
                    <Link
                      className={classes.button}
                      to={`/dashboard/manager/term/${el.id}`}
                    >
                      مشخصات ترم
                    </Link>
                  )}
                  {clientType !== 'teacher' && (
                    <Button
                      onClick={() => {
                        if (clientType === 'manager') {
                          handleDelete(el.id);
                        } else {
                          if (checkIfUserHasRegisterd(el)) {
                            handleStudentDelete(el.id);
                          } else {
                            handleRegister(el.id);
                          }
                        }
                      }}
                      size='small'
                    >
                      {clientType === 'student' &&
                        (checkIfUserHasRegisterd(el)
                          ? 'لغو ثبت نام'
                          : 'ثبت نام')}

                      {clientType === 'manager' && 'حذف'}
                    </Button>
                  )}
                </CardActions>
              </>
            }
          </Card>
        ))}
      </Container>
    </>
  );
};

export default TermCourses;

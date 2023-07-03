import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Paper, Card, CardContent, CardActions } from '@mui/material';
import { Typography, Button } from '@mui/material';
import { http } from '../../../../../services/http';
import { clientTypes } from '../../../../../utils';
import Container from '../../../../../components/container';
import LocalStorage from '../../../../../services/localStorage';

const useStyles = makeStyles({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid',
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

const ManagerListDashboard = () => {
  const classes = useStyles();
  const { clientType } = useParams();
  const [data, setData] = useState();

  const getData = () => {
    http
      .sendRequest(`manager/${clientType}s`, {
        method: 'get',
      })
      .then((res) => setData(res?.data?.data));
  };

  useEffect(() => {
    getData();
  }, [clientType]);

  const onDelete = (id) => {
    http
      .sendRequest(`manager/${clientType}/${id}`, {
        method: 'delete',
      })
      .then(() => getData());
  };

  return (
    <Container
      headerComponent={
        <>
          <Typography>{`لیست ${clientTypes[clientType]}`}</Typography>
          {(clientType === 'course' || clientType === 'term') && (
            <Link
              className={classes.button}
              to={`/dashboard/manager/submit/${clientType}`}
            >{`ثبت ${clientTypes[clientType]}`}</Link>
          )}
        </>
      }
    >
      {data &&
        data.length > 0 &&
        data.map((el) => {
          return (
            <Card className={classes.listItem} key={el.id} variant='outlined'>
              {
                <>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color='text.secondary'
                      gutterBottom
                    >
                      {`نام :${el.name} `}
                    </Typography>

                    <>
                      {clientType !== 'term' && (
                        <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                          {clientType === 'course'
                            ? `واحد درس ${el.value}`
                            : `شماره کاربری :${el.universityId}`}
                        </Typography>
                      )}
                      {clientType === 'course' && (
                        <>
                          <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                            نام ترم {el?.semester?.name}
                          </Typography>
                          <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                            نام استاد {el?.teacher?.name}
                          </Typography>
                          <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                            ظرفیت {el?.capacity}
                          </Typography>
                        </>
                      )}
                    </>
                  </CardContent>
                  <CardActions>
                    {clientType === 'term' && (
                      <Link
                        className={classes.button}
                        to={`/dashboard/manager/term/${el.id}`}
                      >
                        مشخصات ترم
                      </Link>
                    )}
                    {clientType === 'course' && (
                      <>
                        {LocalStorage.getItem('userType') === 'manager' && (
                          <>
                            <Button
                              onClick={() => {
                                if (
                                  el?.semester?.preRegistrationCourses?.includes(
                                    el.id
                                  )
                                ) {
                                  http
                                    .sendRequest(
                                      `manager/term/${el?.semester?.id}/preregistration/${el?.id}`,
                                      { method: 'delete' }
                                    )
                                    .then(() => getData());
                                } else {
                                  http
                                    .sendRequest(
                                      `manager/term/${el?.semester?.id}/preregistration/${el?.id}`,
                                      { method: 'post' }
                                    )
                                    .then(() => getData());
                                }
                              }}
                              size='small'
                            >
                              {el?.semester?.preRegistrationCourses?.includes(
                                el.id
                              )
                                ? 'حذف پیش ثبت نام شده '
                                : 'پیش ثبت نام'}
                            </Button>
                            <Button
                              onClick={() => {
                                if (
                                  el?.semester?.termCourses?.includes(el.id)
                                ) {
                                  http
                                    .sendRequest(
                                      `manager/term/${el?.semester?.id}/register/${el?.id}`,
                                      { method: 'delete' }
                                    )
                                    .then(() => getData());
                                } else {
                                  http
                                    .sendRequest(
                                      `manager/term/${el?.semester?.id}/register/${el?.id}`,
                                      { method: 'post' }
                                    )
                                    .then(() => getData());
                                }
                              }}
                              size='small'
                            >
                              {el?.semester?.termCourses?.includes(el.id)
                                ? 'حذف ثبت نام شده '
                                : 'اضافه به  ثبت نام'}
                            </Button>
                          </>
                        )}
                      </>
                    )}
                    <Button onClick={() => onDelete(el.id)} size='small'>
                      حذف
                    </Button>
                  </CardActions>
                </>
              }
            </Card>
          );
        })}
    </Container>
  );
};

export default ManagerListDashboard;

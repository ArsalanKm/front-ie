import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Card, CardContent, CardActions } from '@mui/material';
import { Typography, Button } from '@mui/material';
import { http } from '../../../../../services/http';
import Container from '../../../../components/container';

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

const TeacherDashboard = () => {
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
    <Container header={'استاد'}>
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

                    {el.name !== 'term' && (
                      <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                        {clientType === 'course'
                          ? `واحد درس ${el.value}`
                          : `شماره کاربری :${el.universityId}`}
                      </Typography>
                    )}
                  </CardContent>
                  <CardActions>
                    {clientType === 'term' && (
                      <Link
                        className={classes.button}
                        to={`/dashboard/teacher/term/${el.id}`}
                      >
                        مشخصات ترم
                      </Link>
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

export default TeacherDashboard;

import { useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Paper, Card, CardContent, CardActions } from '@mui/material';
import { Typography, Button } from '@mui/material';
import { http } from '../../../../../services/http';
import { useEffect } from 'react';
import { clientTypes } from '../../../../../utils';

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

  button: {
    color: 'black !important',
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
});

const AdminListDashboard = () => {
  const classes = useStyles();
  const { clientType } = useParams();
  const [data, setData] = useState();
  const getData = () => {
    http
      .sendRequest(`admin/${clientType}s`, {
        method: 'get',
      })
      .then((res) => setData(res?.data?.data));
  };

  useEffect(() => {
    getData();
  }, [clientType]);

  const onDelete = (id) => {
    http
      .sendRequest(`admin/${clientType}/${id}`, {
        method: 'delete',
      })
      .then(() => getData());
  };

  return (
    <div className={classes.root}>
      <Paper elevation={0} className={classes.container}>
        <div className={classes.header}>
          <Typography>{`لیست ${clientTypes[clientType]}`}</Typography>

          <Link to={`/dashboard/admin/submit/${clientType}`}>
            {`ثبت ${clientTypes[clientType]}`}
          </Link>
        </div>

        <div className={classes.listContainer}>
          {data &&
            data.length > 0 &&
            data.map((el) => {
              return (
                <Card
                  className={classes.listItem}
                  key={el.universityId}
                  variant='outlined'
                >
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

                        <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                          {`شماره کاربری :${el.universityId} `}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button onClick={() => onDelete(el.id)} size='small'>
                          حذف
                        </Button>
                      </CardActions>
                    </>
                  }
                </Card>
              );
            })}
        </div>
      </Paper>
    </div>
  );
};

export default AdminListDashboard;

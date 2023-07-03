import { useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Card, CardContent, CardActions } from '@mui/material';
import { Typography, Button } from '@mui/material';
import { http } from '../../../../../services/http';
import { useEffect } from 'react';
import { clientTypes } from '../../../../../utils';
import Container from '../../../../../components/container';

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

const TermListDashboard = () => {
 const classes = useStyles();
 const { clientType } = useParams();
 const [data, setData] = useState();

 const getData = () => {
  http
   .sendRequest(`student/${clientType}s`, {
    method: 'get',
   })
   .then((res) => setData(res?.data?.data));
 };

 useEffect(() => {
  getData();
 }, [clientType]);

 const onDelete = (id) => {
  http
   .sendRequest(`student/${clientType}/${id}`, {
    method: 'delete',
   })
   .then(() => getData());
 };

 return (
  <Container header={clientTypes[clientType]}>
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
            to={`/dashboard/student/term/${el.id}`}
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

export default TermListDashboard;

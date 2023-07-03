import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Paper } from '@mui/material';
import { Typography } from '@mui/material';
import LocalStorage from '../../services/localStorage';
import { useEffect } from 'react';

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
});

const clientTypes = {
  student: 'دانشجو',
  teacher: 'استاد',
  manager: 'مدیر آموزشی',
  admin: 'مدیر IT',
};

const Dashboard = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { userType } = useParams();
  useEffect(() => {
    if (userType !== LocalStorage.getItem('userType')) {
      LocalStorage.removeItem('token');
      LocalStorage.removeItem('userType');
      navigate('/');
    }
  }, []);

  return (
    <div className={classes.root}>
      <Paper elevation={0} className={classes.container}>
        <div className={classes.header}>
          <Typography>{`داشبورد ${clientTypes[userType]}`}</Typography>
        </div>
      </Paper>
    </div>
  );
};

export default Dashboard;

import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Paper } from '@mui/material';
import { theme } from '../../utils/theme';
import { Typography } from '@mui/material';

const useStyles = makeStyles({
  root: {
    padding: '0 40px',
    marginTop: '8px',
    backgroundColor: 'primary',
  },

  container: {
    width: 'calc(100% - 240px)',
    minHeight: '100%',
    marginTop: '50px',
    minWidth: '350px',
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

// eslint-disable-next-line react/prop-types
const Container = ({ header, children, headerComponent }) => {
  const classes = useStyles();

  return (
    <div className={`${classes.root} root `}>
      <Paper elevation={0} className={classes.container}>
        <div className={classes.header}>
          {headerComponent ? (
            headerComponent
          ) : (
            <>
              <Typography>{`لیست ${header}`}</Typography>
              {(header === 'course' || header === 'term') && (
                <Link
                  className={classes.button}
                  to={`/dashboard/manager/submit/${header}`}
                >{`ثبت ${header}`}</Link>
              )}
            </>
          )}
        </div>

        <div className={classes.listContainer}>{children}</div>
      </Paper>
    </div>
  );
};

export default Container;

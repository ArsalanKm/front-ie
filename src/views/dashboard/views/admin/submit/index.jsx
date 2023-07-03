import { makeStyles } from '@mui/styles';
import { useParams } from 'react-router';
import { clientTypes } from '../../../../../utils';
import { Paper, Typography } from '@mui/material';
import SubmitStudent from '../../../../../components/submit/student';
import SubmitTeacher from '../../../../../components/submit/teacher';
import ManagerSubmit from '../../../../../components/submit/manager';
import CourseSubmit from '../../../../../components/submit/course';
import TermSubmit from '../../../../../components/submit/term';

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
{
  /* <TextField
onChange={(event) => onInputChange(event, 'id')}
className={classes.input}
label='شماره کاربری'
placeholder='شماره کاربری'
/> */
}

const submitInputs = {
  student: SubmitStudent,
  professor: SubmitTeacher,
  manager: ManagerSubmit,
  course: CourseSubmit,
  term: TermSubmit,
};

const SubmitClients = () => {
  const classes = useStyles();
  const { clientType } = useParams();
  const Component = submitInputs[clientType];
  return (
    <div className={`${classes.root} responsive-container`}>
      <Paper elevation={0} className={classes.container}>
        <div className={classes.header}>
          <Typography>{`ثبت ${clientTypes[clientType]}`}</Typography>
        </div>
        <Component />
      </Paper>
    </div>
  );
};

export default SubmitClients;

import { ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

const styles = makeStyles({
 link: {
  height: '60px',
  display: 'flex',
  alignItems: "center",
  justifyContent: 'center',
  borderBottom: '1px solid #ccc',
  '&:hover': {
   backgroundColor: '#eee',
  },
 },
});

// eslint-disable-next-line react/prop-types
const SidebarLink = ({ href, title, color }) => {
 const classes = styles();

 return (
  <Link key={href} to={href}>
   <ListItem
    style={{
     backgroundColor: color,
    }}
    className={classes.link}
    alignItems='flex-start'
   >
    <ListItemText
     style={{ textAlign: 'center' }}
     alignItems='flex-start'
     justifyContent='center'
     primary={title}
    />
   </ListItem>
  </Link>
 );
};

export default SidebarLink;

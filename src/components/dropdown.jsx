import { FormControl } from '@mui/material';
import { Select, MenuItem, InputLabel } from '@mui/material';
import { makeStyles } from '@mui/styles';

const styles = makeStyles({
 select: {
  width: '300px !important',
 },
});
// eslint-disable-next-line react/prop-types
const DropDown = ({ placeholder, type, data, onChange, value }) => {
 const classes = styles();
 return (
  <FormControl>
   <InputLabel id='demo-simple-select-label'>{placeholder}</InputLabel>

   <Select
    labelId='demo-simple-select-label'
    id='demo-simple-select'
    value={value}
    label={placeholder}
    className={classes.select}
    onChange={(event) => onChange(event, type)}
   >
    {/* eslint-disable-next-line react/prop-types */}
    {data?.map((el) => {
     return (
      <MenuItem key={el.name} value={el.id}>
       {el.name}
      </MenuItem>
     );
    })}
   </Select>
  </FormControl>
 );
};

export default DropDown;

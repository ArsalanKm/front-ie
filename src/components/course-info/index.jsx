/* eslint-disable react/prop-types */
import React from 'react';
import { Typography } from '@mui/material';

const CourseInfo = ({ el }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '5px' }}>
      <Typography sx={{ fontSize: 14 }} color='text.secondary'>
        {`نام درس:${el.name} `}
      </Typography>

      <Typography color='text.secondary'>{`واحد درس ${el.value}`}</Typography>
      <Typography color='text.secondary'>
        {`زمان امتحان ${el.examTime}`}
      </Typography>
      <Typography color='text.secondary'>
        {`زمان کلاس ها ${el.value}`}
      </Typography>
      <Typography color='text.secondary'>
        {`گنجایش کلاس ها ${el.capacity}`}
      </Typography>
      <Typography color='text.secondary'>
        {`نام استاد کلاس ${el.teacher?.name} ${el.teacher.familyName}`}
      </Typography>
    </div>
  );
};

export default CourseInfo;

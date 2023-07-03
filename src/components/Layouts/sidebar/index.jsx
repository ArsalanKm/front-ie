import { useState } from 'react';
import { Drawer } from '@mui/material';
import { List, useMediaQuery } from '@mui/material';
import { useEffect } from 'react';
import LocalStorage from '../../../services/localStorage';

import SidebarLink from './SidebarLink';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';

const items = {
  admin: [
    {
      type: 'student',
      title: 'مشاهده لیست دانشجویان',
      href: '/dashboard/admin/list/student',
    },
    {
      type: 'professor',
      title: 'مشاهده لیست اساتید',
      href: '/dashboard/admin/list/professor',
    },
    {
      type: 'manager',
      title: 'مشاهده لیست مدیران',
      href: '/dashboard/admin/list/manager',
    },
  ],
  manager: [
    {
      title: 'مشاهده لیست اساتید',
      href: '/dashboard/manager/list/professor',
    },
    {
      title: 'مشاهده لیست دانشجویان',
      href: '/dashboard/manager/list/student',
    },
    {
      title: 'مشاهده لیست ترم ها',
      href: '/dashboard/manager/list/term',
    },
    {
      title: 'مشاهده لیست درس ها',
      href: '/dashboard/manager/list/course',
    },
  ],
  student: [
    {
      title: 'مشاهده لیست ترم ها',
      href: '/dashboard/student/list/term',
    },
  ],
  teacher: [
    {
      title: 'مشاهده لیست ترم ها',
      href: '/dashboard/teacher/list/term',
    },
  ],
};

const SideBar = () => {
  const userType = LocalStorage.getItem('userType');
  const location = useLocation();
  const sideBarIsOpen = useSelector((state) => state?.sideBarOpen);
  const [data, setData] = useState(items[userType]);
  const matches = useMediaQuery('(min-width:800px)');

  useEffect(() => {
    setData(items[userType]);
  }, [userType]);

  if (location.pathname === '/') {
    return null;
  }

  return (
    <Drawer
      sx={{
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: '240px',
          top: '40px',
          right: 'unset',
        },
      }}
      xl={{
        marginTop: '60px',
      }}
      variant='persistent'
      anchor='right'
      className={matches ? 'sidebar--desktop' : 'sidebar--mobile'}
      open={matches ? true : !matches && sideBarIsOpen}
    >
      <List>
        {data &&
          data.length > 0 &&
          data?.map((el) => {
            return (
              <SidebarLink key={el.href} href={el.href} title={el.title} />
            );
          })}
      </List>
    </Drawer>
  );
};

export default SideBar;

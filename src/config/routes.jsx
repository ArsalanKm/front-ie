import Home from '../views/home';
import Dashboard from '../views/dashboard';
import { Route, Routes, Navigate } from 'react-router-dom';
import AdminListDashboard from '../views/dashboard/views/admin/list';
import SubmitClients from '../views/dashboard/views/admin/submit';
import TeacherListDashboard from '../views/dashboard/views/teacher/list';
import ManagerListDashboard from '../views/dashboard/views/manager/list';
import TermIdPage from '../views/dashboard/views/manager/term';
import TermCourses from '../components/termCourses';
import TermRequests from '../components/term-requests';
import TermListDashboard from '../views/dashboard/views/student/list';
import LocalStorage from '../services/localStorage';

const routes = [
  {
    path: '/',
    component: Home,
    isPublic: true,
  },
  {
    path: '/dashboard/:userType',
    component: Dashboard,
  },

  {
    path: '/dashboard/admin/list/:clientType',
    component: AdminListDashboard,
  },
  {
    path: '/dashboard/:userType/submit/:clientType',
    component: SubmitClients,
  },
  {
    path: '/dashboard/manager/list/:clientType',
    component: ManagerListDashboard,
  },
  {
    path: '/dashboard/teacher/list/:clientType',
    component: TeacherListDashboard,
  },
  {
    path: '/dashboard/:clientType/term/:id',
    component: TermIdPage,
  },

  {
    path: '/dashboard/student/list/:clientType',
    component: TermListDashboard,
  },

  {
    path: '/dashboard/:clientType/term/:id/:coursesType',
    component: TermCourses,
  },
  {
    path: '/dashboard/:clientType/term/:id/requests/:requestType',
    component: TermRequests,
  },
];

export const renderRoutes = () => {
  return (
    <Routes>
      {routes.map((el) => {
        console.log(LocalStorage.getItem('token') !== undefined);
        return (
          <Route
            key={el.path}
            path={el.path}
            element={
              !LocalStorage.getItem('token') && el.path !== '/' ? (
                <Navigate to='/' />
              ) : (
                <el.component />
              )
            }
          />
        );
      })}
    </Routes>
  );
};

import jwtDecode from 'jwt-decode';
import LocalStorage from '../services/localStorage';

export const clientTypes = {
  student: 'دانشجو',
  teacher: 'استاد',
  manager: 'مدیر آموزشی',
  admin: 'مدیر IT',
  professor: 'استاد',
  term: 'ترم',
  course: 'درس',
};

export const getUserInfo = () => {
  return jwtDecode(LocalStorage.getItem('token'));
};

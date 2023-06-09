// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Usuário',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Livros',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
  },
  // {
  //   title: 'Login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  /*  {
      title: 'Not found',
      path: '/404',
      icon: icon('ic_disabled'),
    },
    {
    title: 'blog',
    path: '/dashboard/blog',
    icon: icon('ic_blog'),
  },
    */
];

export default navConfig;

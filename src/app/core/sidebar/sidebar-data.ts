import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Inicio',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    route: 'home/dashboard',
  },
  {
    navCap: 'Módulos',
  },
  {
    displayName: 'Usuario',
    iconName: 'list',
    route: 'home/user',
  },
  {
    displayName: 'Centro',
    iconName: 'layout-navbar-expand',
    route: 'home/center',
  },
  {
    displayName: 'Material',
    iconName: 'box',
    route: 'home/material',
  },
  {
    displayName: 'Historial canje de materiales',
    iconName: 'checkup-list',
    route: 'home/material-exchange',
  },
  {
    displayName: 'Gestión de materiales',
    iconName: 'list-details',
    route: 'home/exchanging',
  },
  {
    displayName: 'Cupones',
    iconName: 'ticket',
    route: 'home/coupon',
  },
  {
    displayName: 'Canjear',
    iconName: 'exchange',
    route: 'home/coupon',
  },
  {
    displayName: 'Mis cupones',
    iconName: 'ticket',
    route: 'home/coupon/user',
  },
];

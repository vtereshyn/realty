import { UserRole } from '../generated/graphql';

interface Route {
  url: string;
  component: string;
  isProtected: boolean;
  authorizedFor: UserRole[];
}

export const routes: Route[] = [
  {
    url: '/',
    component: 'IndexPageScreen',
    isProtected: true,
    authorizedFor: []
  },
  {
    url: '/login',
    component: 'LoginScreen',
    isProtected: false,
    authorizedFor: []
  },
  {
    url: '/signup',
    component: 'SignupScreen',
    isProtected: false,
    authorizedFor: []
  },
  {
    url: '/manage/users',
    component: 'ManageScreen',
    isProtected: true,
    authorizedFor: [UserRole.Admin]
  },
  {
    url: '/manage/users/create/:role',
    component: 'CreateUserScreen',
    isProtected: true,
    authorizedFor: [UserRole.Admin]
  },
  {
    url: '/apartments',
    component: 'SearchApartmentScreen',
    isProtected: true,
    authorizedFor: []
  },
  {
    url: '/apartments/view/:id',
    component: 'ApartmentScreen',
    isProtected: true,
    authorizedFor: []
  },
  {
    url: '/apartments/update/:id',
    component: 'UpdateApartmentScreen',
    isProtected: true,
    authorizedFor: [UserRole.Admin, UserRole.Realtor]
  },
  {
    url: '/apartments/create',
    component: 'CreateApartmentScreen',
    isProtected: true,
    authorizedFor: [UserRole.Admin, UserRole.Realtor]
  }
];

export const pathByComponentName = routes.reduce<{ [key: string]: string }>(
  (res, val) => {
    res[val.component] = val.url;
    return res;
  },
  {}
);

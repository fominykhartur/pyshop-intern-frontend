import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },

  {
    path: '/register',
    component: () => import('layouts/RegisterPage.vue'),
  },
  {
    path: '/login',
    component: () => import('layouts/LoginPage.vue'),
  },
  {
    path: '/profile',
    component: () => import('layouts/ProfilePage.vue'),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;

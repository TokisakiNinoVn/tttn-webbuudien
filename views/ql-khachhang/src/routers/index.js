// src/routers/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/HomePage.vue';
import Introduce from '@/pages/IntroducePage.vue';
import Login from '@/pages/LoginPage.vue';
import NotFound from '@/pages/NotFoundPage.vue';

const routes = [
    { path: '/', component: Introduce },
    { path: '/login', component: Login },
    { path: '/home', component: Home, meta: { requiresAuth: true } },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Kiểm tra nếu có token trong localStorage

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login'); // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
  } else {
    next(); // Cho phép truy cập trang
  }
});

export default router;

import store from '@/store';
import Appointments from '@/views/Appointments.vue';
import CreateAppointment from '@/views/CreateAppointment.vue';
import DoctorAppointments from '@/views/DoctorAppointments.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/appointments', name: 'Appointments', component: Appointments, meta: { requiresAuth: true } },
  { path: '/appointments/doctor', name: 'DoctorAppointments', component: DoctorAppointments, meta: { requiresAuth: true } },
  { path: '/appointments/create', name: 'CreateAppointment', component: CreateAppointment, meta: { requiresAuth: true } },
  { path: '/', redirect: { name: 'Appointments' } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === 'Login' || to.name === 'Register') {
    next();
  } else if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isAuthenticated) {
      next({ name: 'Login' });
    } else {
      const userRole = store.getters.userRole;

      console.log('userRole', userRole);
      if (userRole === 'doctor' && to.name !== 'DoctorAppointments') {
        next({ name: 'DoctorAppointments' });
      } else if (userRole === 'receptionist' && to.name !== 'Appointments') {
        next({ name: 'Appointments' });
      } else {
        next();
      }
    }
  } else {
    next();
  }
});

export default router;
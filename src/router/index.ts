import { createRouter, createWebHistory } from 'vue-router';
import MessagesView from '../views/MessagesView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'messages',
      component: MessagesView
    },
    {
      path: '/archive',
      name: 'archive',
      component: () => import('../views/ArchiveView.vue')
    },
    {
      path: '/options',
      name: 'options',
      component: () => import('../OptionsPage.vue')
    }
  ]
});

export default router;

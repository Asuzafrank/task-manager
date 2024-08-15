import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFoundPage from '@/views/NotFoundPage.vue'
import RegisterUserView from '@/views/RegisterUserView.vue'
import LoginView from '@/views/LoginView.vue'
import TaskPage from '@/views/TaskPage.vue'
import AddTask from '@/views/AddTask.vue'
import AllTasks from '@/views/AllTasks.vue'
import EditTask from '@/views/EditTask.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterUserView
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: EditTask
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/all-tasks',
      name: 'allTasks',
      component: AllTasks
    },
    {
      path: '/task/:id',
      name: 'taskpage',
      component: TaskPage
    },
    {
      path: '/add-task',
      name: 'AddTask',
      component: AddTask
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFoundPage',
      component: NotFoundPage
    },
 
  ]
})

export default router

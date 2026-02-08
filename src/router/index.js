import { createRouter, createWebHistory } from 'vue-router'
import DashboardLayout from '@/layout/DashboardLayout.vue'

import UsersView from '@/modules/users/UsersView.vue'
import DashboardView from '@/modules/dashboard/DashboardView.vue'
import ProfileView from '@/modules/profile/ProfileView.vue'
import DocsView from '@/modules/documentation/DocsView.vue'

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    children: [
      { path: '', redirect: '/dashboard' }, 
      { path: 'dashboard', name: 'dashboard', component: DashboardView },
      { path: 'usuarios', name: 'users', component: UsersView },
      { path: 'perfil', name: 'profile', component: ProfileView },
      { path: 'docs', name: 'docs', component: DocsView }
    ]
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})

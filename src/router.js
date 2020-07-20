import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Books from "./views/Books";
import Calendar from "./views/Calendar";
import Boards from "./views/Boards";
import ShowBoard from "./views/ShowBoard";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/books',
      name: 'book',
      component: Books
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: Calendar
    },
    {
      path: '/boards',
      name: 'boards',
      component: Boards
    },
    {
      path: '/boards/:id',
      name: 'show-board',
      component: ShowBoard
    }
  ]
})

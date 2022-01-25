// La liste des routes

import Todo from "../pages/Todo.vue";
import Calendar from "@/pages/Calendar.vue";
import Home from "@/pages/Home.vue";

export default [
    {path: '/', name: 'home', component: Home},
    {path: '/tableau', name: 'todo', component: Todo},
    {path: '/calendar', name: 'calendar', component: Calendar}
]

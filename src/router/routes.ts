// La liste des routes

import Todo from "../pages/Todo.vue";
import Calendar from "@/pages/Calendar.vue";
import Home from "@/pages/Home.vue";
import Table from "@/pages/Table.vue";

export default [
    {path: '/', name: 'home', component: Home},
    {path: '/tableau', name: 'todo', component: Todo},
    {path: '/calendar', name: 'calendar', component: Calendar},
    {path: '/table', name: 'table', component: Table}
]

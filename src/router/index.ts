// Configurer le router

import VueRouter from "vue-router";
import Vue from "vue";
import routes from "./routes"
import userService from "@/tools/services/user.service";

Vue.use(VueRouter);

const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    if (to.name !== 'home' && !userService.isLogged()) next({ name: 'home' })
    else next()
})

export default router;

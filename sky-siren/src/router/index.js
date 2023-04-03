import { createRouter, createWebHistory } from "vue-router";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: () => import("../views/HomePage.vue")},
        { path: "/sign-in", component: () => import("../views/auth/SignIn.vue") },
        { path: "/sign-up", component: () => import("../views/auth/SignUp.vue") },
        { path: "/about", component: () => import("../views/AboutPage.vue") },
        { path: "/news", component: () => import("../views/user/LocalNews.vue") },
        { path: "/profile", component: () => import("../views/user/Profile.vue"), meta: { requiresAuth: true }},
        { path: "/preferences", component: () => import("../views/user/Preferences.vue"), meta: { requiresAuth: true } },
        { path: "/:pathMatch(.*)*", component: () => import("../views/errors/404.vue") },
    ],
});

export default router;
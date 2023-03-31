import { createRouter, createWebHistory } from "vue-router";
import { auth } from '@/firebase';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: () => import("../views/Index.vue")},
        { path: "/sign-in", component: () => import("../views/auth/SignIn.vue") },
        { path: "/sign-up", component: () => import("../views/auth/SignUp.vue") },
        { path: "/forgot-password", component: () => import("../views/auth/ForgotPassword.vue")},
        { path: "/reset-password", component: () => import("../views/auth/ResetPassword.vue") },
        { path: "/profile", component: () => import("../views/user/Profile.vue"), meta: { requiresAuth: true }},
        { path: "/preferences", component: () => import("../views/user/Preferences.vue"), meta: { requiresAuth: true } },
        { path: "/:pathMatch(.*)*", component: () => import("../views/errors/404.vue") },
    ],
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        auth.onAuthStateChanged((user) => {
            if (user) {
                next();
            } else {
                next("/sign-in");
            }
        });
    } else {
        next();
    }
});

export default router;
import { createWebHistory, createRouter } from "vue-router";
const routes =  [
    {
        path: "/login",
        alias: "/login",
        name: "admin-login",
        component: () => import("./components/Login")
    },
    {
        path: "/addRealmRole",
        alias: "/addRealmRole",
        name: "admin",
        component: () => import("./components/AddRealmRole")
    }
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;

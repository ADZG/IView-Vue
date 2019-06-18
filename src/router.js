import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import Home from "@/views/Home.vue";
import Users from "@/components/users.vue";
import Welcome from "@/components/welcome.vue";
Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login
    },
    {
      path: "/home",
      component: Home,
      name: "Home",
      redirect: { path: "/home/welcome" },
      children: [
        { path: "welcome", component: Welcome, name: "welcome" },
        { path: "users", component: Users, name: "users" }
      ]
    }
  ]
});
// 设置全局前置的导航守卫
router.beforeEach((to, from, next) => {
  var token = localStorage.getItem("Superman");
  if (token) {
    next(); //如果有token秘钥,则允许通过
  } else {
    if (to.path !== "/") {
      next({ path: "/" });
    } else {
      next();
    }
  }
});

export default router;

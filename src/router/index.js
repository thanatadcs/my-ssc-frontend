import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
];

const router = new VueRouter({
  routes,
});

// Setup beforeEach hook to check the logged in sync the login states with backend
router.beforeEach(async (to, from, next) => {
  // get login state using whoami and axios
  let response = await Vue.axios.get("/api/whoami");
  console.log(response);
  if (to.name !== "Login") {
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;

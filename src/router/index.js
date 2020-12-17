import Vue from 'vue'
import Router from 'vue-router'
import PIQuery from '@/views/PIQuery' //导航搭建
import Home from '@/views/home/Home' //首页
import Login from '@/views/login/Login' //登录页
import Error500 from '@/views/error/Error500' //404报错页面
import Error404 from '@/views/error/Error404' //500报错页面
import Error502 from '@/views/error/Error502' //502报错页面

import p1 from '@/views/pags/1.vue'
import p2 from '@/views/pags/2.vue'
import p3 from '@/views/pags/3.vue'
import p4 from '@/views/pags/4.vue'
import p5 from '@/views/pags/5.vue'
import p6 from '@/views/pags/6.vue'
Vue.use(Router)

const router = new Router({
    routes: [{
        path: '/',
        redirect: '/login'
    },
    {
        path: '/error-404',
        name: 'error-404',
        component: Error404,
    }, {
        path: '/error-500',
        name: 'error-500',
        component: Error500,
    }, {
        path: '/error-502',
        name: 'error-502',
        component: Error502,
    },{
        path: '/login',
        name: 'login',
        component: Login
    }, {
        path: '/piquery',
        name: 'piquery',
        component: PIQuery,
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: 'home',
                component: Home,
            },
            {
                path: '/p1',
                name: 'p1',
                component: p1,
            },
            {
                path: '/p2',
                name: 'p2',
                component: p2,
            },
            {
                path: '/p3',
                name: 'p3',
                component: p3,
            },
            {
                path: '/p4',
                name: 'p4',
                component: p4,
            },
            {
                path: '/p5',
                name: 'p5',
                component: p5,
            },
            {
                path: '/p6',
                name: 'p6',
                component: p6,
            },
        ]
    },
    {
            path: '/*',
            name: 'error-404',
            redirect: '/error-404',
    },]
});
router.beforeEach((to, from, next) => {
    if (to.path == '/login') {
        sessionStorage.clear();
        next();
    } else {
        next();
    }
})

export default router;
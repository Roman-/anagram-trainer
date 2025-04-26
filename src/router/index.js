import {createRouter, createWebHashHistory} from 'vue-router'
import GameView from "@/views/GameView.vue";
import SetupView from "@/views/SetupView.vue";
import HomeView from "@/views/HomeView.vue";
import ResultView from "@/views/ResultView.vue";
import TestView from "@/views/TestView.vue";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/setup',
            name: 'setup',
            component: SetupView
        },
        {
            path: '/game',
            name: 'game',
            component: GameView
        },
        {
            path: '/result',
            name: 'result',
            component: ResultView
        },
        {
            path: '/test',
            name: 'test',
            component: TestView
        },
        // all unknown paths redirects to home
        {
            path: '/:pathMatch(.*)*',
            redirect: '/'
        }
    ]
})

export default router

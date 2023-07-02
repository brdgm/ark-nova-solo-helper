import { RouteRecordRaw } from 'vue-router'
import AppHome from '@/views/AppHome.vue'
import NotFound from '@/views/NotFound.vue'
import SetupGame from '@/views/SetupGame.vue'
import RoundPlayer from '@/views/RoundPlayer.vue'
import RoundBot from '@/views/RoundBot.vue'
import SetupARNO from '@/views/SetupARNO.vue'
import Scoring from '@/views/Scoring.vue'
import createRouter from 'brdgm-commons/src/util/router/createRouter'
import { name } from '@/../package.json'

const LOCALSTORAGE_KEY = `${name}.route`

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'AppHome',
    component: AppHome
  },
  {
    path: '/setupGame',
    name: 'SetupGame',
    component: SetupGame
  },
  {
    path: '/setupARNO',
    name: 'SetupARNO',
    component: SetupARNO
  },
  {
    path: '/round/:round/player/:player',
    name: 'RoundPlayer',
    component: RoundPlayer
  },
  {
    path: '/round/:round/bot/:bot',
    name: 'RoundBot',
    component: RoundBot
  },
  {
    path: '/scoring',
    name: 'Scoring',
    component: Scoring
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

export default createRouter(routes, LOCALSTORAGE_KEY, 'AppHome')

import { Module } from 'vuex'
import { State } from '..'

const states = {
    innerWidth: window.innerWidth as number,
    innerHeight: window.innerHeight as number,
}
export type typeof_sys = typeof states
export default {
    namespaced: true,
    state: states,
    mutations: {
        get_screen_size(state) {
            state.innerWidth = window.innerWidth
            state.innerHeight = window.innerHeight
        },
    },
    actions: {
        get_screen_size({ commit }) {
            commit('get_screen_size')
        },
    },
} as Module<typeof_sys, State>

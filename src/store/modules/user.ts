import { Module } from 'vuex'
import { State } from '..'
type role = {
    name: string
}

const states = {
    name: 'test' as string,
    age: 0 as number,
    roles: [] as role[],
    active: 0,
}
export type typeof_user = typeof states
export default {
    namespaced: true,
    state: states,
    mutations: {
        init(state, paylaod: typeof_user) {
            console.log(`---------->:paylaod`, paylaod)
            // for (const key in paylaod) {
            //     state[key] = paylaod[key]
            // }
            state['name'] = paylaod['name']
            state['age'] = paylaod['age']
            state['roles'] = paylaod['roles']
        },
        initRoles(state, paylaod: role[]) {
            console.log(`---------->:paylaod`, paylaod)
            state.roles = paylaod
        },
        addRole(state, payload: role) {
            state.roles.push(payload)
        },
        changeActive(state, payload: any) {
            state.active = payload;
        },
    },
    actions: {
        init({ commit }, paylaod: typeof_user) {
            commit('init', paylaod)
        },
        initRoles({ commit }, paylaod: role[]) {
            commit('initRoles', paylaod)
        },
        addRole({ commit }, paylaod: role) {
            commit('addRole', paylaod)
        },
        changeActive({ commit }, paylaod: any) {
            commit('changeActive', paylaod)
        },
    },
} as Module<typeof_user, State>

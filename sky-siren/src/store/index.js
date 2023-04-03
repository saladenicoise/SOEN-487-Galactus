import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate'

import user from './modules/user.js';

export default createStore({
    modules: {
        user,
    },
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],
});
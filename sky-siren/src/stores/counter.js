import { ref, computed } from 'vue'
import { createStore } from 'vuex'
import { defineStore } from 'pinia'
import authModule from '../../../cipher-chief/auth/index.js';
import userDataModule from '../../../cipher-chief/userData/index.js';


const store = createStore({
  modules: {
     auth: authModule,
     userPreferences:userDataModule},
});


export default store;

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

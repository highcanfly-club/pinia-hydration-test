import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia, defineStore, Store } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
createApp(App).use(pinia).mount("#app");

const VAL = 10000;

const useStore = defineStore("store", {
  state: () => {
    return {
      storeTimestamp: 0,
    };
  },
  persist: {
    storage: localStorage,
    paths: ["storeTimestamp"],
    afterRestore: (ctx) => {
        // const store = useStore()
        // store.$hydrate()
        console.log('force hydration');
        (ctx.store as Store<"store",{storeTimestamp:number}>).$hydrate()
    },
  },
});

const store = useStore()

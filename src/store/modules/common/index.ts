import { defineStore } from 'pinia';

const staticData = defineStore('common', {
  state: () => {
    return {
      isAssetsAllow: false,
      userAddress: '',
    };
  },

  getters: {},

  actions: {},
});

export default staticData;

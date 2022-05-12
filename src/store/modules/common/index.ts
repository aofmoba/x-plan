import { defineStore } from 'pinia';

const staticData = defineStore('common', {
  state: () => {
    return {
      isAssetsAllow: false,
      userAddress: '',
      badgeData: [],
    };
  },

  getters: {},

  actions: {},
});

export default staticData;

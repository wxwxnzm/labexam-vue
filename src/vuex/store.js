/**
 * Created by gjx on 17-5-6.
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const INFO_SET = 'INFO_SET';
const DOTYPE_SET = 'DOTYPE_SET';
const INFO_SINGLE_SET = 'INFO_SINGLE_SET';

const state = {
  curInfo: 'tips',
  doType: {subject: '', type: ''},
  infoSingleType: ''
};

const mutations = {
  [INFO_SET](state, info) {
    state.curInfo = info;
  },
  [DOTYPE_SET](state, type) {
    state.doType = type;
  },
  [INFO_SINGLE_SET](state, single) {
    state.infoSingleType = single;
  }
};

const getters = {
  getCurInfo: (state) => state.curInfo,
  getDoType: (state) => state.doType,
  getInfoSingleType: (state) => state.infoSingleType
};

const actions = {
  setCurInfo: ({commit}, info) => {
    commit(INFO_SET, info);
  },
  setDoType: ({commit}, type) => {
    commit(DOTYPE_SET, type);
  },
  setInfoSingleType: ({commit}, single) => {
    commit(INFO_SINGLE_SET, single);
  }
};

export default new Vuex.Store({
      state,
      mutations,
      getters,
      actions
});

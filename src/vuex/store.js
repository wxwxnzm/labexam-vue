/**
 * Created by gjx on 17-5-6.
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const INFO_SET = 'INFO_SET';
const DOTYPE_SET = 'DOTYPE_SET';
const INFO_SINGLE_SET = 'INFO_SINGLE_SET';
const ANWSER_SET = 'ANWSER_SET';
const SCORE_SET = 'SCORE_SET';
const TIME_SET = 'TIME_SET';

const state = {
  curInfo: 'tips',
  doType: {subject: '', type: ''},
  infoSingleType: '',
  anwsers: [],
  score: -1,
  time: 0
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
  },
  [ANWSER_SET](state, answer) {
    state.anwsers = answer;
  },
  [SCORE_SET](state, _score) {
    state.score = _score;
  },
  [TIME_SET](state, _score) {
    state.time = _score;
  }
};

const getters = {
  getCurInfo: (state) => state.curInfo,
  getDoType: (state) => state.doType,
  getInfoSingleType: (state) => state.infoSingleType,
  getAnswers: (state) => state.anwsers,
  getScore: (state) => state.score,
  getTime: (state) => state.time
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
  },
  setAnswers: ({commit}, single) => {
    commit(ANWSER_SET, single);
  },
  setScore: ({commit}, single) => {
    commit(SCORE_SET, single);
  },
  setTime: ({commit}, single) => {
    commit(TIME_SET, single);
  }
};

export default new Vuex.Store({
      state,
      mutations,
      getters,
      actions
});

import { NavigationExperimental } from 'react-native';

const { StateUtils } = NavigationExperimental;

const initialState = {
  index: 0,
  routes: [{ key: 'login' }],
  barRoute: 'classes',
};

// Navigation functions
const actionsMap = {
  push(state, action) {
    const { key } = action;
    if (StateUtils.has(state, key)) {
      return StateUtils.jumpTo(state, key);
    }
    return StateUtils.push(state, action);
  },
  back(state) {
    return state.index > 0 ? StateUtils.pop(state) : state;
  },
  jumpTo(state, { key }) {
    return StateUtils.jumpTo(state, key);
  },
  logout(state) {
    return StateUtils.jumpToIndex(state, 0);
  },
  bar(state, { key }) {
    const newState = { ...state };
    newState.barRoute = key;
    return newState;
  },
};

export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
};

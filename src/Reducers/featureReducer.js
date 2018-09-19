import { RECEIVE_PROPS } from 'melody-component';


export const featureReducer = (state = { renderBottom: false, filterAvail: true }, action) => {
  switch (action.type) {
    case RECEIVE_PROPS: return { ...state, ...action.payload };

    case 'RENDER_INPUT_BOTTOM':
      return {
        ...state,
        renderBottom: true
      }

    case 'HIDE_FILTER':
      return {
        ...state,
        filterAvail: false
      }
  }
  return state;
};

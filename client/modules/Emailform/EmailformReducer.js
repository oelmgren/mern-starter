// Import Actions
import { ADD_EMAILFORM, ADD_EMAILERRORRESPONSE, CLEAR_MESSAGE } from './EmailformActions';

// Initial State
const initialState = {message: "", err: false};

const EmailformReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EMAILFORM:
      return {
        ...state, ...action,
      };
    
    case ADD_EMAILERRORRESPONSE:
    return {
      ...state, ...action,
    };

    case CLEAR_MESSAGE:
      return {
        ...state, message: "",
      };

    default:
      return state;
  }
};

export default EmailformReducer;

const defaultState = {
  request: {
    string: '',
    category: '',
    sorting: '',
    startIndex: 0,
  }
}

const ADD_INDEX = "ADD_INDEX";
const CREATE_REQUEST = "NEW_REQUESTS";

export const requestsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_INDEX:
      return {...state, request: { ...state.request, startIndex: state.request.startIndex + action.payload }}
    case CREATE_REQUEST:
      return {...state, request: {      
        string: action.payload.string,
        category: action.payload.category,
        sorting: action.payload.sorting,
        startIndex: 0,
      }}
    default:
      return state
  }
}

export const addIndexAction = (payload) => ({type: ADD_INDEX, payload});
export const createRequestAction = (payload) => ({type: CREATE_REQUEST, payload});
const defaultState = {
  books: [],
}

const ADD_BOOKS = "ADD_BOOKS";
const PUT_BOOKS = "PUT_BOOKS";

export const booksReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_BOOKS:
      return {...state, books: action.payload}
    case PUT_BOOKS:
      return {...state, books: { ...state.books, items: state.books.items.concat(action.payload.items)}}
    default:
      return state
  }
}

export const addBooksAction = (payload) => ({type: ADD_BOOKS, payload});
export const putBooksAction = (payload) => ({type: PUT_BOOKS, payload});



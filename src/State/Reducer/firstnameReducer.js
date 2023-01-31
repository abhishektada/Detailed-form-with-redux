const Reducer = (state = [], action) => {
  if (action.type === "formadd") {
    state = [...state, action.payload];
    return state;
  } else if (action.type === "deleteform") {
    let deletedState = state.filter((item) => item.id !== action.payload);
    return deletedState;
  } else if (action.type === "editform") {
    let newState = state;
    for (let index = 0; index < newState.length; index++) {
      const element = newState[index];
      if (element.id === action.payload.id) {
        newState[index] = action.payload;
      }
    }
    return newState;
  } else {
    return state;
  }
};
export default Reducer;

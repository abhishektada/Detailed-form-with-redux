const Reducer = (state = [], action) => {
    if (action.type === "COPY") {
        state = [action.payload];
      console.log("CopyState ",state)
      return state;
    } else {
      return state;
    }
  };
  export default Reducer;
  
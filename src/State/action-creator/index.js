export const addFirstName = (form) => {
  return (dispatch) => {
    dispatch({
      type: "formadd",
      payload: form
    });
  };
};

export const deleteForm = (index) => {
  return (dispatch) => {
    dispatch({
      type: "deleteform",
      payload: index
    });
  };
};

export const editForm = (eform) => {
  return (dispatch) => {
    dispatch({
      type: "editform",
      payload: eform
    });
  };
};

export const copyForm =(form)=>{
  return (dispatch) => {
    dispatch({
      type: "COPY",
      payload: form
    });
  };
}

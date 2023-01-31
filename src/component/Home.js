import React, { useRef, useState } from "react";
import Formitem from "./Formitem";
import Addform from "./Addform";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { actionCreator } from "../State/index";

const Home = () => {
  const dispatch = useDispatch();
  const refAdd = useRef(null);
  const form = useSelector((state) => state.form);
  const [currentForm, setCurrentForm] = useState();
  const [editClick, setEditClick] = useState(false);
  
  const addForm = () => {
    refAdd.current.click();
    setEditClick(false);
  };

  const handleDlt = (id) => {
    dispatch(actionCreator.deleteForm(id));
  };

  const handleEdit = async (crntForm) => {
    refAdd.current.click();
    setCurrentForm(crntForm);
    setEditClick(true);
  };

  const editClickReset = () => {
    setEditClick(false);
  };


  return (
    <div className="container">
      {/* Add Details Form */}
      <button
        ref={refAdd}
        type="button"
        className="btn btn-primary d-none "
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Fill your details
              </h5>
            </div>
            <div className="modal-body">
              <div className="container">
                <form className="row g-3 needs-validation" noValidate>
                  <Addform
                    editClick={editClick}
                    editClickReset={editClickReset}
                    currentForm={currentForm}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Home Page ALL Forms */}

      <div className="container mt-4">
        <h3 className="text-center mb-4">All Forms</h3>
        <hr />
        <div className="row">
          <div className="container text-center my-2">
            {form.length === 0 && "No forms to display!"}
          </div>

          {form.map((form) => {
            return (
              <Formitem
                key={form.id}
                form={form}
                handleEdit={handleEdit}
                handleDlt={handleDlt}
              />
            );
          })}
        </div>
      </div>
      <div className="container">
        <i className="fa-regular fa-square-plus fa-6x" onClick={addForm}></i>
      </div>
    </div>
  );
};

export default Home;

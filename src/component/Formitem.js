import React from "react";

const Formitem = (props) => {
  const noData = "pending"
  const { form, handleEdit, handleDlt } = props;
  const { react, java, python, flask } = form.intrest; 
  const { email,firstName,lastName,userName,contactNumber,city,state,pincode,dateOfBirth,gender } = form.details
  const { id } = form
  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  function intrestvalue (){
    let value = `${react ? "React" : " "}
    ${react && (java || python || flask) ? ", " : ""}
    ${java ? "Java" : " "}
    ${(react && java && python) || (java && python) ? ", " : ""}
    ${python ? "Python" : " "}
    ${((react, java, python) && (java, python, flask)) || (java && flask)
      ? ", "
      : ""}
    ${flask ? "Flask" : ""}`
    return value
  }

  return (
    <div className="col-md-3 my-3">
      <div className="card">
        <div className="card-body row">
          <h5 className="card-title mb-3 col">
            {capitalize(firstName)} {capitalize(lastName)}
          </h5>
          <div className="col">
            <i
              className="fa-solid fa-trash  fa-2x mx-2"
              onClick={() => {
                handleDlt(id);
              }}
            ></i>
            <i
              className="fa-solid fa-file-pen fa-2x"
              onClick={() => {
                handleEdit(form);
              }}
            ></i>
          </div>
          <p className="card-text">
            <strong>Email :- </strong>
            {email?email:noData}
          </p>
          <p className="card-text">
            <strong>Contact Number:- </strong>
            {contactNumber?contactNumber:noData}
          </p>
          <p className="card-text">
            <strong>Username :- </strong>
            {userName?userName:noData}
          </p>
          <p className="card-text">
            <strong>Intrests :- </strong> {!react&&!java&&!python&&!flask?noData:intrestvalue()}
          </p>
          <p className="card-text">
            <strong>Gender :- </strong>
            {capitalize(gender?gender:noData)}
          </p>
          <p className="card-text">
            <strong>Date of Birth :- </strong>
            {dateOfBirth?dateOfBirth:noData}
          </p>
          <p className="card-text">
            <strong>City :- </strong>
            {capitalize(city?city:noData)},
          </p>
          <p className="card-text">
            <strong>State :- </strong>
            {capitalize(state?state:noData)},
          </p>
          <p className="card-text">
            <strong>Pincode :- </strong>
            {pincode?pincode:noData}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Formitem;

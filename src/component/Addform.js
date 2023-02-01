import React, { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { actionCreator } from "../State/index";

const Addform = (props) => {
  const { currentForm, editClick, editClickReset } = props;
  const refClose = useRef(null);
  const dispatch = useDispatch();
  const [copyBtn, setCopyBtn] = useState(false);
  const [copyText, setCopyText] = useState();
  const [intrest, setIntrest] = useState({
    react: false,
    java: false,
    python: false,
    flask: false,
  });
  const [count, setCount] = useState(0);
  const [name, setName] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    contactNumber: "",
    gender: "",
    dateOfBirth: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const [unused, setUnused] = useState(0);
  const [formError, setFormError] = useState({});

  if (editClick) {
    if (count === 0) {
      setName(currentForm.details);
      setIntrest(currentForm.intrest);
      setCount(1);
    }
  }

  const saveState = () => {
    if (Object.keys(formError).length === 0 && isSubmit) {
      if (editClick) {
        setCount(1);
        refClose.current.click();
        editClickReset();
        dispatch(
          actionCreator.editForm({
            id: currentForm.id,
            details: { ...name },
            intrest: { ...intrest },
          })
        );
        clearData();
      } else if (!editClick) {
        setCount(0);
        editClickReset();
        refClose.current.click();
        dispatch(
          actionCreator.addFirstName({
            id: new Date().valueOf(),
            details: { ...name },
            intrest: { ...intrest },
          })
        );
        clearData();
      } else {
        setCount(0);
        alert("Unable Submit without 'Name'");
        clearData();
      }
      setIsSubmit(false);
    }
  };

  useEffect(() => {
    if (Object.keys(formError).length === 0 && isSubmit) {
      saveState();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unused]);

  const clearData = () => {
    setIntrest({
      react: false,
      java: false,
      python: false,
      flask: false,
    });
    setName({
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      userName: "",
      contactNumber: "",
      gender: "",
      dateOfBirth: "",
      city: "",
      state: "",
      pincode: "",
    });
  };

  const handleSubmit = () => {
    setFormError(validate(name, intrest));
    setIsSubmit(true);
    setUnused(unused + 1);
  };
  const stringToNumber = (string) => {
    let number = parseInt(string);
    return number;
  };
  const validate = (value, intrest) => {
    const errors = {};
    const dateOfBirth = stringToNumber(value.dateOfBirth);
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regexUsername = /^([A-z])*[^\s]\1*$/;
    const regexName = /^[A-Za-z]+$/;
    const intrestValue =
      !intrest.java && !intrest.python && !intrest.react && !intrest.flask;
    if (!value.firstName) {
      errors.firstName = "Firstname is required. ";
    } else if (value.firstName.length < 3) {
      errors.firstName = "Firstname should not less than 3 charactors.";
    } else if (!regexName.test(value.firstName)) {
      errors.firstName = "Firstname should only have Alphabets.";
    }
    if (!value.email) {
      errors.email = "email is required. ";
    } else if (!regexEmail.test(value.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!value.lastName) {
      errors.lastName = "Lastname is required. ";
    } else if (value.lastName.length < 3) {
      errors.lastName = "Lastname should not less than 3 charactors.";
    } else if (!regexName.test(value.lastName)) {
      errors.lastName = "Lastname should only have Alphabets.";
    }
    if (!value.userName) {
      errors.userName = "Username is required. ";
    } else if (value.userName.length < 3) {
      errors.userName = "Username should not less than 3 charactors.";
    } else if (!regexUsername.test(value.userName)) {
      errors.userName = "Username should not have any spaces.";
    }
    if (!value.city) {
      errors.city = "City is required. ";
    }
    if (!value.state) {
      errors.state = "State is required. ";
    }
    if (!value.pincode) {
      errors.pincode = "Pincode is required. ";
    } else if (value.pincode.length < 6) {
      errors.pincode = "Pincode should not less than 6 charactors.";
    } else if (value.pincode.length > 6) {
      errors.pincode = "Pincode should not greter than 6 charactors.";
    }
    if (!value.contactNumber) {
      errors.contactNumber = "Contact number is required. ";
    } else if (value.contactNumber.length < 10) {
      errors.contactNumber =
        "Contact number should not less than 10 charactors.";
    } else if (value.contactNumber.length > 10) {
      errors.contactNumber =
        "Contact number should not greter than 10 charactors.";
    }
    if (intrestValue) {
      errors.intrest = "Intrest is required. ";
    }
    if (!value.gender) {
      errors.gender = "Gender is required. ";
    }
    if (!value.dateOfBirth) {
      errors.dateOfBirth = "Date of birth is required.";
    } else if (dateOfBirth > 2004) {
      errors.dateOfBirth = "You are too young to submit the form.";
    }

    return errors;
  };

  const handleClose = () => {
    setCount(0);
    editClickReset();
    clearData();
    setFormError({});
  };

  const handlePaste = () => {
    setName({
      ...copyText.details,
    });
    setIntrest({
      ...copyText.intrest,
    });
  };

  const handleCopy = () => {
    setCopyBtn(true);
    setCopyText({
      details: { ...name },
      intrest: { ...intrest },
    });
  };

  const onChange = (e) => {
    setName({ ...name, [e.target.name]: e.target.value });
  };
  const onChangeCheckbox = (e) => {
    setIntrest({ ...intrest, [e.target.value]: e.target.checked });
  };

  return (
    <>
      <form
        className="row g-3 needs-validation"
        noValidate
        // onSubmit={handleSubmit}
      >
        {/* firstName */}
        <div className="col-md-4">
          <label htmlFor="firstName" className="form-label">
            First name :
          </label>
          <input
            value={name.firstName}
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            onChange={onChange}
          />
          <div className="feedback">{formError.firstName}</div>
        </div>

        {/* Lastname */}
        <div className="col-md-4">
          <label htmlFor="lastName" className="form-label">
            Last name :
          </label>
          <input
            value={name.lastName}
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            onChange={onChange}
            required
          />
          <div className="feedback">{formError.lastName}</div>
        </div>

        {/* Username */}
        <div className="col-md-4">
          <label htmlFor="userName" className="form-label">
            Username
          </label>
          <div className="input-group has-validation">
            <span className="input-group-text" id="userName">
              @
            </span>
            <input
              value={name.userName}
              type="text"
              className="form-control"
              id="userName"
              aria-describedby="inputGroupPrepend"
              name="userName"
              onChange={onChange}
              required
            />
          </div>
            <div className="feedback">{formError.userName}</div>
        </div>

        {/* city */}
        <div className="col-md-6">
          <label htmlFor="city" className="form-label">
            City
          </label>
          <input
            value={name.city}
            type="text"
            className="form-control"
            id="city"
            name="city"
            onChange={onChange}
            required
          />
          <div className="feedback">{formError.city}</div>
        </div>

        {/* state */}
        <div className="col-md-3">
          <label htmlFor="state" className="form-label">
            State
          </label>
          <select
            className="form-select"
            id="state"
            name="state"
            value={name.state}
            onChange={onChange}
            required
          >
            <option disabled></option>
            <option>Gujarat</option>
            <option>Maharashtra</option>
          </select>
          <div className="feedback">{formError.state}</div>
        </div>

        {/* pincode */}
        <div className="col-md-3">
          <label htmlFor="pincode" className="form-label">
            Pincode
          </label>
          <input
            value={name.pincode}
            type="number"
            className="form-control"
            id="pincode"
            name="pincode"
            onChange={onChange}
            required
          />
          <div className="feedback">{formError.pincode}</div>
        </div>

        {/* email */}
        <div className="row mb-4 mt-4">
          <label htmlFor="email" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-7">
            <input
              value={name.email}
              type="email"
              className="form-control"
              id="email"
              name="email"
              onChange={onChange}
            />
            <div className="feedback">{formError.email}</div>
          </div>
        </div>

        {/* contactNumber */}
        <div className="row mb-3 ">
          <label htmlFor="contactNumber" className="col-sm-2 col-form-label">
            Contact Number
          </label>
          <div className="col input-group flex-wrap">
            <span className="input-group-text" id="addon-wrapping">
              +91
            </span>
            <input
              value={name.contactNumber}
              type="number"
              className="col-sm-5 border rounded"
              placeholder="  Contact Number"
              aria-describedby="addon-wrapping"
              name="contactNumber"
              onChange={onChange}
              minLength="10"
            />
          </div>
          <div className="feedback" style={{ marginLeft: "70px" }}>
            {formError.contactNumber}
          </div>
        </div>

        {/* intrest */}
        <div className="row mb-3 ">
          <div className="col-sm-2" htmlFor="gridCheck1">
            Select Intrests
          </div>
          <div className="col-sm-10">
            <div className="form-check ">
              <input
                className="form-check-input"
                type="checkbox"
                name="intrest"
                value="react"
                onChange={onChangeCheckbox}
                checked={intrest.react}
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                React
              </label>
            </div>
            <div className="form-check ">
              <input
                className="form-check-input"
                type="checkbox"
                name="intrest"
                value="java"
                onChange={onChangeCheckbox}
                checked={intrest.java}
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Java
              </label>
            </div>
            <div className="form-check ">
              <input
                className="form-check-input"
                type="checkbox"
                name="intrest"
                value="python"
                onChange={onChangeCheckbox}
                checked={intrest.python}
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Python
              </label>
            </div>
            <div className="form-check ">
              <input
                className="form-check-input"
                type="checkbox"
                name="intrest"
                value="flask"
                onChange={onChangeCheckbox}
                checked={intrest.flask}
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Flask
              </label>
            </div>
            <div className="feedback">{formError.intrest}</div>
          </div>
        </div>

        {/* gender */}
        <fieldset className="row mb-3">
          <legend className="col-form-label col-sm-2 pt-0">Gender</legend>
          <div className="col-sm-10">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                value="male"
                onChange={onChange}
                id="gridRadios1"
                checked={name.gender === "male"}
              />
              <label className="form-check-label" htmlFor="gridRadios1">
                Male
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                value="female"
                onChange={onChange}
                id="gridRadios2"
                checked={name.gender === "female"}
              />
              <label className="form-check-label" htmlFor="gridRadios2">
                Female
              </label>
            </div>
            <div className="feedback">{formError.gender}</div>
          </div>
        </fieldset>

        {/* dateOfBirth */}
        <div className="row mb-3">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            Date of Birth
          </label>
          <div className="col-sm-5">
            <input
              value={name.dateOfBirth}
              type="date"
              className="form-control"
              id="inputEmail3"
              name="dateOfBirth"
              onChange={onChange}
            />
            <div className="feedback">{formError.dateOfBirth}</div>
          </div>
        </div>
        <div className="modal-footer">
          <button
            ref={refClose}
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
            onClick={handleClose}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleCopy}
          >
            Copy Form
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handlePaste}
            disabled={!copyBtn}
          >
            Paste
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default Addform;


//CheckBox
<div className="row mb-3 ">
  <div className="col-sm-2" htmlFor="gridCheck1">
    Select Intrests
  </div>
  <div className="col-sm-10">
    <div className="form-check ">
      <input
        className="form-check-input"
        type="checkbox"
        id="flexCheckDefault"
        name="intrest"
        value="React"
        onChange={onChangeCheckbox}
      />
      <label className="form-check-label" htmlFor="flexCheckDefault">
        React
      </label>
    </div>
    <div className="form-check ">
      <input
        className="form-check-input"
        type="checkbox"
        id="flexCheckDefault"
        name="intrest"
        value="Java"
        onChange={onChangeCheckbox}
      />
      <label className="form-check-label" htmlFor="flexCheckDefault">
        Java
      </label>
    </div>
    <div className="form-check ">
      <input
        className="form-check-input"
        type="checkbox"
        id="flexCheckDefault"
        name="intrest"
        value="Python"
        onChange={onChangeCheckbox}
      />
      <label className="form-check-label" htmlFor="flexCheckDefault">
        Python
      </label>
    </div>
    <div className="form-check ">
      <input
        className="form-check-input"
        type="checkbox"
        id="flexCheckDefault"
        name="intrest"
        value="Flask"
        onChange={onChangeCheckbox}
      />
      <label className="form-check-label" htmlFor="flexCheckDefault">
        Flask
      </label>
    </div>
  </div>
</div>;


setnewForm({
  id_: currentForm.id_,
  firstName: currentForm.firstName,
  lastName: currentForm.lastName,
  email: currentForm.email,
  userName: currentForm.userName,
  contactNumber: currentForm.contactNumber,
  gender: currentForm.gender,
  dateOfBirth: currentForm.dateOfBirth,
  city: currentForm.city,
  state: currentForm.state,
  pincode: currentForm.pincode,
});

const [newForm, setnewForm] = useState({
  id_: id,
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
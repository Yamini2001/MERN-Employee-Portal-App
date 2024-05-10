import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddEmployee = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [designation, setDesignation] = useState("");
  const [gender, setGender] = useState("");
  const [course, setCourse] = useState("");
  const [imgUpload, setImgUpload] = useState(null);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveEmployee = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("Mobile No", mobileNo);
      formData.append("designation", designation);
      formData.append("gender", gender);
      formData.append("course", course);
      formData.append("imgUpload", imgUpload);

      await axios.post("http://localhost:5000/employees", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/employees");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Employees</h1>
      <h2 className="subtitle">Add New Employee</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveEmployee}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Employee Name"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    type="email"
                    className="input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Mobile No</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={mobileNo}
                    onChange={(e) => setMobileNo(e.target.value)}
                    placeholder="Mobile No"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Designation</label>
                <div className="control">
                  <div className="select">
                    <select
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                    >
                      <option value="">Select Designation</option>
                      <option value="HR">HR</option>
                      <option value="Manager">Manager</option>
                      <option value="Sales">Sales</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label">Gender</label>
                <div className="control">
                  <label className="radio">
                    <input
                      type="radio"
                      value="Male"
                      checked={gender === "Male"}
                      onChange={(e) => setGender(e.target.value)}
                    />{" "}
                    Male
                  </label>
                  <label className="radio">
                    <input
                      type="radio"
                      value="Female"
                      checked={gender === "Female"}
                      onChange={(e) => setGender(e.target.value)}
                    />{" "}
                    Female
                  </label>
                </div>
              </div>
              <div className="field">
                <label className="label">Course</label>
                <div className="control">
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      value="MCA"
                      checked={course.includes("MCA")}
                      onChange={(e) =>
                        setCourse((prev) =>
                          e.target.checked ? [...prev, "MCA"] : prev.filter((c) => c !== "MCA")
                        )
                      }
                    />{" "}
                    MCA
                  </label>
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      value="BCA"
                      checked={course.includes("BCA")}
                      onChange={(e) =>
                        setCourse((prev) =>
                          e.target.checked ? [...prev, "BCA"] : prev.filter((c) => c !== "BCA")
                        )
                      }
                    />{" "}
                    BCA
                  </label>
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      value="BSC"
                      checked={course.includes("BSC")}
                      onChange={(e) =>
                        setCourse((prev) =>
                          e.target.checked ? [...prev, "BSC"] : prev.filter((c) => c !== "BSC")
                        )
                      }
                    />{" "}
                    BSC
                  </label>
                </div>
              </div>
              <div className="field">
                <label className="label">Image Upload</label>
                <div className="control">
                  <input
                    type="file"
                    className="input"
                    onChange={(e) => setImgUpload(e.target.files[0])}
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddEmployee;

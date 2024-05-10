import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEmployeeEdit = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [designation, setDesignation] = useState("");
  const [gender, setGender] = useState("");
  const [course, setCourse] = useState([]);
  const [imgUpload, setImgUpload] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getEmployeeById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/employees/${id}`
        );
        const employeeData = response.data;
        setName(employeeData.Name);
        setEmail(employeeData.Email);
        setMobileNo(employeeData["Mobile No"]);
        setDesignation(employeeData.Designation);
        setGender(employeeData.Gender);
        setCourse(employeeData.Course);
        // Set imgUpload state with image data if needed
        setImgUpload(employeeData.imgUpload);
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };
    getEmployeeById();
  }, [id]);

  const updateEmployee = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/employees/${id}`, {
        Name: name,
        Email: email,
        "Mobile No": mobileNo,
        Designation: designation,
        Gender: gender,
        Course: course,
        // Add imgUpload if needed
        imgUpload: imgUpload,
      });
      navigate("/employees");
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <div>
      <h1 className="title">Edit Employee</h1>
      <div className="card">
        <div className="card-content">
          <form onSubmit={updateEmployee}>
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  className="input"
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Mobile No</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Enter mobile number"
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value)}
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
                    name="gender"
                    value="Male"
                    checked={gender === "Male"}
                    onChange={(e) => setGender(e.target.value)}
                  />{" "}
                  Male
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    name="gender"
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
                  onChange={(e) => setImgUpload(e.target.files[0])}
                />
              </div>
            </div>
            <div className="field is-grouped">
              <div className="control">
                <button type="submit" className="button is-primary">
                  Update
                </button>
              </div>
              <div className="control">
                <button className="button is-link" onClick={() => navigate("/employees")}>
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormEmployeeEdit;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    getEmployees();
  }, []);

  const getEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const deleteEmployee = async (employeeId) => {
    try {
      await axios.delete(`http://localhost:5000/employees/${employeeId}`);
      getEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.Name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div>
      <h1 className="title">Employee List</h1>
      <div className="field is-grouped mb-3">
        <div className="control is-expanded">
          <input
            className="input"
            type="text"
            placeholder="Enter search keyword"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>
      </div>
      <Link to="/employees/add" className="button is-primary mb-2">
        Add New Employee
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>Image</th>
            <th>Unique Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Create date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee, index) => (
            <tr key={employee.id}>
              <td>
                <img src={employee.Image} alt="Employee" style={{ width: "50px" }} />
              </td>
              <td>{index + 1}</td>
              <td>{employee.Name}</td>
              <td>{employee.Email}</td>
              <td>{employee["Mobile No"]}</td>
              <td>{employee.Designation}</td>
              <td>{employee.gender}</td>
              <td>{employee.Course}</td>
              <td>{employee["Create date"]}</td>
              <td>
                <Link
                  to={`/employees/edit/${employee.id}`}
                  className="button is-small is-info"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteEmployee(employee.id)}
                  className="button is-small is-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;

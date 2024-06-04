// src/App.js

import React, { useState } from "react";
import axios from "axios";
import ProfileForm from "./components/profileForm";
import CustomDropdown from "./components/dropDownMenu";

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [department, setDepartment] = useState("");
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleCreateProfileClick = () => {
    setShowForm(true);
  };

  const handleSelectDepartment = async (selectedDepartment) => {
    setDepartment(selectedDepartment);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/profiles/department/${selectedDepartment}`
      );
      setEmployees(response.data);
      setSelectedEmployee(null); // Clear selected employee when changing department
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
  };

  const handleEmployeeClick = async (employeeId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/profiles/${employeeId}`
      );
      setSelectedEmployee(response.data);
    } catch (err) {
      console.error("Error fetching employee profile:", err);
    }
  };

  return (
    <div className="App">
      <h1>Employee Profile Viewer</h1>
      <CustomDropdown onSelectDepartment={handleSelectDepartment} />

      <div>
        <h2>Employees in {department} Department</h2>
        <ul>
          {employees.map((employee) => (
            <li
              key={employee._id}
              onClick={() => handleEmployeeClick(employee._id)}
            >
              {employee.name}
            </li>
          ))}
        </ul>
      </div>

      {selectedEmployee && (
        <div>
          <h2>Employee Profile</h2>
          <p>
            <strong>Name:</strong> {selectedEmployee.name}
          </p>
          <p>
            <strong>Email:</strong> {selectedEmployee.email}
          </p>
          <p>
            <strong>Age:</strong> {selectedEmployee.age}
          </p>
          <p>
            <strong>Address:</strong> {selectedEmployee.address}
          </p>
          <p>
            <strong>Department:</strong> {selectedEmployee.department}
          </p>
        </div>
      )}

      {!showForm ? (
        <button onClick={handleCreateProfileClick}>Create Profile</button>
      ) : (
        <ProfileForm />
      )}
    </div>
  );
};

export default App;

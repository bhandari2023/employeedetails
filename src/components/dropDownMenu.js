// src/components/dropDownMenu.js

import React from "react";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const CustomDropdown = ({ onSelectDepartment }) => {
  const handleSelect = (eventKey) => {
    onSelectDepartment(eventKey);
  };

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Select Department
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item eventKey="Human Resource">Human Resource</Dropdown.Item>
        <Dropdown.Item eventKey="Accounts">Accounts</Dropdown.Item>
        <Dropdown.Item eventKey="IT">IT</Dropdown.Item>
        <Dropdown.Item eventKey="Service">Service</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CustomDropdown;

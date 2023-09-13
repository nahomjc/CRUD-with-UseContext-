import "../App.css";
import React, { useState, useEffect, useContext, createContext } from "react";
import { TextInput, Paper, Text } from "@mantine/core";

import {
  NumberInput,
  Button,
  Select,
  Switch,
  Divider,
  Table,
  Checkbox,
} from "@mantine/core";
import { EmployeeContext } from "../App";
import { notifications } from "@mantine/notifications";
interface Employee {
  name: string;
  age: string | number;
  subscribed: string | number;
  employed: boolean;
}
interface EmployeeContextProps {
  employees: Employee[];
  handleDelete: any;
  selected: any;
  setSelected: any;
  setEmployees: any;
}
const EmployeeList = () => {
  const { employees, selected, setSelected } = useContext(
    EmployeeContext
  ) as EmployeeContextProps;
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  useEffect(() => {
    // Update the list whenever the employees state changes.
    console.log(employees, "list");
  }, [employees]);
  const handleRowClick = (index: number) => {
    setSelected(index);
    setSelectedRow(index);
  };
  console.log(employees, "list");
  return (
    <div>
      <Table withBorder miw={860}>
        <thead>
          <tr className="table-row">
            <th className="table-row">Name</th>
            <th className="table-row">Age</th>
            <th className="table-row">Subscribed</th>
            <th className="table-row">Employed</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr
              key={index}
              onClick={() => handleRowClick(index)}
              className={selectedRow === index ? "selected-row" : ""}
            >
              <th className="table-cell">{employee.name}</th>
              <th className="table-cell">{employee.age}</th>
              <th className="table-cell">{employee.subscribed}</th>
              <th className="table-cell">
                {employee.employed ? "Employed" : "UnEmployed"}
              </th>
            </tr>
          ))}
        </tbody>
      </Table>
      {employees.length === 0 ? <Text> Empty😞 🙏Please Add</Text> : ""}
    </div>
  );
};

export default EmployeeList;

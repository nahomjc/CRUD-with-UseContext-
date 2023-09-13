import "../App.css";
import React, { useState, useEffect, useContext } from "react";
import { Text, Table } from "@mantine/core";

import { EmployeeContext } from "../App";

import { EmployeeContextProps } from "../model/EmployeeModel";

const EmployeeList = () => {
  const { employees, setSelected } = useContext(
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

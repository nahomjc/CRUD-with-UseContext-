import React, { useState, useEffect, useContext, createContext } from "react";

import Grid from "@material-ui/core/Grid/Grid";
import "./App.css";
import AddEmployee from "./component/AddEmployee";
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
import { notifications } from "@mantine/notifications";
import { DeleteEmployee } from "./component/DeleteEmployee";
interface Employee {
  name: string;
  age: string | number;
  subscribed: string | number;
  employed: boolean;
}

interface ThemeContextProps {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

interface EmployeeContextProps {
  employees: Employee[];

  selected: any;
  setSelected: any;
  setEmployees: any;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);
export const EmployeeContext = createContext<EmployeeContextProps | undefined>(
  undefined
);

function App() {
  const [theme, setTheme] = useState("night");
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    const localTheme = window.localStorage.getItem("themex");
    setTheme(localTheme || "night");
  }, []);

  useEffect(() => {
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const localEmployees = JSON.parse(
      window.localStorage.getItem("employees") || "[]"
    );
    setEmployees(localEmployees);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <EmployeeContext.Provider
        value={{ employees, selected, setSelected, setEmployees }}
      >
        <div className={theme}>
          <div className="container">
            <div className=" form">
              <AddEmployee />
              <Divider size="xs" mt={30} />
              <Switch
                label="Mode"
                checked={theme === "night"}
                onChange={() => setTheme(theme === "day" ? "night" : "day")}
                pt={40}
                mb={20}
              />

              <DeleteEmployee />
            </div>
            <div className=" table">
              <EmployeeList />
            </div>
          </div>
        </div>
      </EmployeeContext.Provider>
    </ThemeContext.Provider>
  );
}

function EmployeeList() {
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
        {employees.length === 0 ? <Text> Empty😞 🙏Please Add</Text> : ""}
      </Table>
    </div>
  );
}

export default App;

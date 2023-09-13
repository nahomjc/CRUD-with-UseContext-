import React, { useState, useEffect, createContext } from "react";

import "./App.css";
import AddEmployee from "./component/AddEmployee";

import { Switch, Divider } from "@mantine/core";

import { DeleteEmployee } from "./component/DeleteEmployee";
import { Employee, EmployeeContextProps } from "./model/EmployeeModel";
import EmployeeList from "./component/EmployeeList";

interface ThemeContextProps {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
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
    const localTheme = window.localStorage.getItem("theme");
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
                pt={20}
                mb={30}
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

export default App;

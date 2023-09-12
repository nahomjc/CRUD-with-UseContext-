import React, { useState, useEffect, useContext, createContext } from "react";
import {
  TextField,
  FormControlLabel,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid/Grid";
import "./App.css";
import {
  createMuiTheme,
  createTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import { TextInput, Paper } from "@mantine/core";
import {
  NumberInput,
  Button,
  Select,
  Switch,
  Divider,
  Table,
  Checkbox,
} from "@mantine/core";
interface Employee {
  name: string;
  age: string | number;
  subscribed: string | number;
  employed: boolean;
}

interface ThemeContextProps {
  themex: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

interface EmployeeContextProps {
  employees: Employee[];
  handleDelete: any;
  selected: any;
  setSelected: any;
  setEmployees: any;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);
const EmployeeContext = createContext<EmployeeContextProps | undefined>(
  undefined
);
const theme = createTheme({
  palette: {
    primary: {
      main: "#008000", // Set your desired primary color here
    },
    background: {
      default: "#008000", // Set your desired background color here
    },
    text: {
      primary: "#008000", // Set your desired text color here
    },
  },
});
function App() {
  const [themex, setTheme] = useState("night");
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    const localTheme = window.localStorage.getItem("themex");
    setTheme(localTheme || "night");
  }, []);

  useEffect(() => {
    window.localStorage.setItem("theme", themex);
  }, [themex]);

  useEffect(() => {
    const localEmployees = JSON.parse(
      window.localStorage.getItem("employees") || "[]"
    );
    setEmployees(localEmployees);
  }, []);

  const handleDelete = (index: number) => {
    const newEmployees = [...employees];

    newEmployees.splice(index, 1);
    setEmployees(newEmployees);
    window.localStorage.setItem("employees", JSON.stringify(newEmployees));
  };

  return (
    <ThemeContext.Provider value={{ themex, setTheme }}>
      <EmployeeContext.Provider
        value={{ employees, handleDelete, selected, setSelected, setEmployees }}
      >
        <div className={themex}>
          <div className="container">
            <div className=" form">
              <EmployeeForm />
              <Divider size="xs" mt={30} />
              <Switch
                label="Mode"
                checked={themex === "night"}
                onChange={() => setTheme(themex === "day" ? "night" : "day")}
                pt={40}
                mb={20}
              />
              <DeleteButton />
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

function EmployeeForm() {
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | "">(18);
  const [subscribed, setSubscribed] = useState("subscribed");
  const [employed, setEmployed] = useState(false);
  const { setEmployees } = useContext(EmployeeContext) as EmployeeContextProps;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const employees = JSON.parse(
      window.localStorage.getItem("employees") || "[]"
    );
    employees.push({ name, age, subscribed, employed });

    const updated = [...employees];
    setEmployees(updated);
    window.localStorage.setItem("employees", JSON.stringify(employees));
    setName("");
    setAge(18);

    setEmployed(false);
    console.log(employees);
  };

  return (
    <>
      {" "}
      <form onSubmit={handleSubmit}>
        <Grid
          container
          direction="column"
          justifyContent="space-evenly"
          alignItems="flex-start"
        >
          <TextInput
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            pb={10}
            w={250}
          />
          <NumberInput
            defaultValue={18}
            onChange={setAge}
            placeholder="Age"
            max={120}
            min={18}
            w={250}
            pb={10}
          />
          <Select
            placeholder="Pick one"
            value={subscribed}
            onChange={setSubscribed as any}
            data={[
              { value: "subscribed", label: "Subscribed" },
              { value: "NotSubscribed", label: "NotSubscribed" },
              { value: "Others", label: "others" },
            ]}
            w={250}
          />

          <Checkbox
            checked={employed}
            onChange={(e) => setEmployed(e.target.checked)}
            label="Employed"
            pt={20}
          />

          <Button color="gray" type="submit" w={250} disabled={!name} mt={20}>
            Add Employee
          </Button>
        </Grid>
      </form>
    </>
  );
}
function DeleteButton() {
  const { employees, handleDelete, selected } = useContext(
    EmployeeContext
  ) as EmployeeContextProps;

  return (
    <Button
      color="gray"
      onClick={() => handleDelete(selected)}
      w={250}
      disabled={employees.length === 0}
    >
      Delete
    </Button>
  );
}
function EmployeeList() {
  const { employees, handleDelete, selected, setSelected } = useContext(
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
      <Table withBorder miw={800}>
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
        {employees.length === 0 ? "Empty please add employee" : ""}
      </Table>
    </div>
  );
}

export default App;

import React, { useState, useEffect, useContext, createContext } from "react";

import Grid from "@material-ui/core/Grid/Grid";
import "../App.css";

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
const AddEmployee = () => {
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
    const newEmployeeName = name;
    notifications.show({
      title: "Successful",
      message: `${newEmployeeName} is add to the table`,
    }) as any;
    setEmployed(false);
    console.log(newEmployeeName);
  };

  return (
    <>
      {" "}
      <Text mt={-39} className="text">
        Insert Row
      </Text>
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
            Insert
          </Button>
        </Grid>
      </form>
    </>
  );
};

export default AddEmployee;

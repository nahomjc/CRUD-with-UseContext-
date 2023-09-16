import React, { useState,  useContext } from "react";


import "../App.css";

import { TextInput, Text } from "@mantine/core";
import {
  NumberInput,
  Button,
  Select,

  Checkbox,
  Group,
} from "@mantine/core";
import { EmployeeContext } from "../App";
import { notifications } from "@mantine/notifications";

import { EmployeeContextProps } from "../model/EmployeeModel";
const AddEmployee = () => {
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number | "">(18);
  const [subscribed, setSubscribed] = useState<string>("subscribed");
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
        <Group>
          <TextInput
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            pb={5}
            w={250}
          />
          <NumberInput
            defaultValue={18}
            onChange={setAge}
            placeholder="Age"
            max={120}
            min={18}
            w={250}
            pb={5}
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
            pt={6}
          />

          <Button color="gray" type="submit" w={250} disabled={!name} mt={10}>
            Insert
          </Button>
        </Group>
      </form>
    </>
  );
};

export default AddEmployee;

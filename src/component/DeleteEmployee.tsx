import { EmployeeContext } from "../App";
import React, { useContext } from "react";
import { notifications } from "@mantine/notifications";
import { Button } from "@mantine/core";
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
export const DeleteEmployee = () => {
  const { employees, selected, setEmployees } = useContext(
    EmployeeContext
  ) as EmployeeContextProps;
  const handleDelete = () => {
    const newEmployees = [...employees];

    if (selected !== null) {
      newEmployees.splice(selected as number, 1);
      setEmployees(newEmployees);
      window.localStorage.setItem("employees", JSON.stringify(newEmployees));
      notifications.show({
        title: "Successful",
        message: `employe removed successfuly`,
      }) as any;
    }
  };
  return (
    <Button
      color="gray"
      onClick={() => handleDelete()}
      w={250}
      disabled={employees.length === 0}
    >
      Delete
    </Button>
  );
};

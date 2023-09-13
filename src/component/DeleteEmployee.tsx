import { EmployeeContext } from "../App";
import React, { useContext } from "react";
import { notifications } from "@mantine/notifications";
import { Button } from "@mantine/core";
import { Employee, EmployeeContextProps } from "../model/EmployeeModel";

export const DeleteEmployee = () => {
  const { employees, selected, setEmployees } = useContext(
    EmployeeContext
  ) as EmployeeContextProps;
  const handleDelete = () => {
    const newEmployees = [...employees];
    console.log(employees);
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

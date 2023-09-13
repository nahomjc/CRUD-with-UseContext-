export interface Employee {
  name: string;
  age: string | number;
  subscribed: string | number;
  employed: boolean;
}
export interface EmployeeContextProps {
  employees: Employee[];
  selected: any;
  setSelected: any;
  setEmployees: any;
}

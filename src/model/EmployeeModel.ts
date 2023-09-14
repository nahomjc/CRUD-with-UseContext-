export interface Employee {
  name: string;
  age: string | number;
  subscribed: string | number;
  employed: boolean;
}
export interface EmployeeContextProps {
  employees: Employee[];
  selected: number | null;
  setSelected: React.Dispatch<React.SetStateAction<null>>;
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
}

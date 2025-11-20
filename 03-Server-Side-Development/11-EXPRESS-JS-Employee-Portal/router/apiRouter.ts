import express from "express";
import type { IEmployee } from "../models/IEmployee.js";

const apiRouter: express.Router = express.Router();
import { v4 } from "uuid";

let employees: IEmployee[] = [
  {
    id: "085-PYV-7453",
    firstName: "Archambault",
    lastName: "Raspison",
    email: "araspison0@bluehost.com",
    gender: "Non-binary",
    ipAddress: "113.114.249.59",
  },
  {
    id: "524-OML-1956",
    firstName: "Godfrey",
    lastName: "Axten",
    email: "gaxten1@trellian.com",
    gender: "Genderfluid",
    ipAddress: "217.130.6.243",
  },
  {
    id: "784-KPE-3066",
    firstName: "Chan",
    lastName: "Breazeall",
    email: "cbreazeall2@japanpost.jp",
    gender: "Male",
    ipAddress: "174.51.133.123",
  },
  {
    id: "068-PRU-7564",
    firstName: "Mufi",
    lastName: "Rourke",
    email: "mrourke3@goo.ne.jp",
    gender: "Female",
    ipAddress: "244.105.181.114",
  },
  {
    id: "255-ZRX-0854",
    firstName: "Mamie",
    lastName: "Stummeyer",
    email: "mstummeyer4@edublogs.org",
    gender: "Bigender",
    ipAddress: "241.39.140.105",
  },
];

// REST API Configuration

/*
    USAGE : READ / GET all Employees
    URL : http://127.0.0.1:5000/employees
    METHOD : GET
    FIELDS : no-fields
 */

apiRouter.get(
  "/employees",
  (request: express.Request, response: express.Response) => {
    response.status(200).json({
      employees: employees,
      total: employees.length,
    });
  }
);

/*
    USAGE : READ / GET an Employee
    URL : http://127.0.0.1:5000/employees/:empId
    METHOD : GET
    FIELDS : no-fields
 */
apiRouter.get(
  "/employees/:empId",
  (request: express.Request, response: express.Response) => {
    // logic
    let employeeId: string = request.params.empId;
    let selectedEmployee: IEmployee | undefined = employees.find(
      (employee) => employee.id === employeeId
    );
    if (selectedEmployee !== undefined) {
      response.status(200).json({ employee: selectedEmployee });
    }
  }
);

/*
    USAGE : CREATE an Employee
    URL : http://127.0.0.1:5000/employees/
    METHOD : POST
    FIELDS : no-fields
 */
apiRouter.post(
  "/employees",
  (request: express.Request, response: express.Response) => {
    // logic\
    let newEmployee: IEmployee = {
      id: v4(),
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      gender: request.body.gender,
      ipAddress: request.body.ipAddress,
    };
    employees.push(newEmployee);
    response.status(200).json({ msg: "New Employee is Created" });
  }
);

/*
    USAGE : UPDATE an Employee
    URL : http://127.0.0.1:5000/employees/:empId
    METHOD : PUT
    FIELDS : no-fields
 */
apiRouter.put(
  "/employees/:empId",
  (request: express.Request, response: express.Response) => {
    // logic
    let employeeId: string = request.params.empId;
    let updatedEmployee: IEmployee = {
      id: employeeId,
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      gender: request.body.gender,
      ipAddress: request.body.ipAddress,
    };
    let removableIndex: number = employees
      .map((employee) => employee.id)
      .indexOf(employeeId);
    if (removableIndex !== -1) {
      employees.splice(removableIndex, 1, updatedEmployee);
      response.status(200).json({ msg: "Employee is Updated" });
    } else {
      response.status(400).json({ msg: "Invalid Id" });
    }
  }
);

/*
    USAGE : DELETE an Employee
    URL : http://127.0.0.1:5000/employees/:empId
    METHOD : DELETE
    FIELDS : no-fields
 */
apiRouter.delete(
  "/employees/:empId",
  (request: express.Request, response: express.Response) => {
    // logic
    let employeeId: string = request.params.empId;
    let removableIndex: number = employees
      .map((employee) => employee.id)
      .indexOf(employeeId);
    employees.splice(removableIndex, 1);
    response.status(200).json({ msg: "Employee is Deleted", id: employeeId });
  }
);

export default apiRouter;

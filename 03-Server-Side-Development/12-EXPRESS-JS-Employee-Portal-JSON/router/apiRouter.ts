import express from "express";
import type { IEmployee } from "../models/IEmployee.ts";
import { v4 } from "uuid";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ✔ Fix for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const apiRouter: express.Router = express.Router();

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
    fs.readFile(
      path.join(__dirname, "..", "database", "employees.json"),
      "utf-8",
      (err, data) => {
        let employees: IEmployee[] = JSON.parse(data);
        response.status(200).json({
          employees: employees,
          total: employees.length,
        });
      }
    );
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
    fs.readFile(
      path.join(__dirname, "..", "database", "employees.json"),
      "utf-8",
      (err, data) => {
        let employees: IEmployee[] = JSON.parse(data);
        let selectedEmployee: IEmployee | undefined = employees.find(
          (employee) => employee.id === employeeId
        );
        if (selectedEmployee !== undefined) {
          response.status(200).json({ employee: selectedEmployee });
        }
      }
    );
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
    fs.readFile(
      path.join(__dirname, "..", "database", "employees.json"),
      "utf-8",
      (err, data) => {
        let employees: IEmployee[] = JSON.parse(data);
        employees.push(newEmployee);
        fs.writeFile(
          path.join(__dirname, "..", "database", "employees.json"),
          JSON.stringify(employees),
          "utf-8",
          (err) => {
            if (err) throw err;
            response.status(200).json({ msg: "New Employee is Created" });
          }
        );
      }
    );
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
    fs.readFile(
      path.join(__dirname, "..", "database", "employees.json"),
      "utf-8",
      (err, data) => {
        let employees: IEmployee[] = JSON.parse(data);
        let removableIndex: number = employees
          .map((employee) => employee.id)
          .indexOf(employeeId);
        if (removableIndex !== -1) {
          employees.splice(removableIndex, 1, updatedEmployee);
          fs.writeFile(
            path.join(__dirname, "..", "database", "employees.json"),
            JSON.stringify(employees),
            "utf-8",
            (err) => {
              if (err) throw err;
              response.status(200).json({ msg: "Employee is Updated" });
            }
          );
        } else {
          response.status(400).json({ msg: "Invalid Id" });
        }
      }
    );
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
    let employeeId: string = request.params.empId;
    // logic
    fs.readFile(
      path.join(__dirname, "..", "database", "employees.json"),
      "utf-8",
      (err, data) => {
        let employees: IEmployee[] = JSON.parse(data);
        let removableIndex: number = employees
          .map((employee) => employee.id)
          .indexOf(employeeId);
        if (removableIndex !== -1) {
          employees.splice(removableIndex, 1);
          fs.writeFile(
            path.join(__dirname, "..", "database", "employees.json"),
            JSON.stringify(employees),
            "utf-8",
            (err) => {
              if (err) throw err;
              response
                .status(200)
                .json({ msg: "Employee is Deleted", id: employeeId });
            }
          );
        } else {
          response.status(400).json({ msg: "Invalid Id" });
        }
      }
    );
  }
);
export default apiRouter;

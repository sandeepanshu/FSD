import React, { useEffect, useState } from "react";
import type { IEmployee } from "./models/IEmployee";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Employees: React.FC = () => {
  const [employees, setEmployees] = useState<IEmployee[]>([]);

  useEffect(() => {
    const dataURL =
      "https://gist.githubusercontent.com/thenaveensaggam/2c0a106c0b66ef2c8f4eb2b2c8c31e6d/raw/416efcc2300afc13cd0aa6413b2de4918a50ad30/contacts-02-12-2020.json";

    axios
      .get(dataURL)
      .then((response) => setEmployees(response.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <section className="mt-4">
        <div className="container">
          <div className="row">
            <div className="col">
              <h3 className="text-primary">Employees</h3>
              <p className="text-muted">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Praesentium, ratione. Aperiam deserunt explicabo laborum
                molestiae natus repellendus sunt suscipit tempore.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-5">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="table-responsive shadow-sm rounded-3">
                <table className="table table-hover align-middle text-center">
                  <thead className="bg-dark text-white">
                    <tr>
                      <th>SNO</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Age</th>
                      <th>Location</th>
                      <th>Phone</th>
                    </tr>
                  </thead>

                  <tbody>
                    {employees.length > 0 ? (
                      employees.map((employee) => (
                        <tr key={employee.login.uuid}>
                          <td>{employee.login.uuid.slice(-5)}</td>

                          <td>
                            <NavLink
                              to={`/employees/${employee.login.uuid}`}
                              className="text-decoration-none fw-bold text-primary"
                            >
                              {employee.name.title}. {employee.name.first}{" "}
                              {employee.name.last}
                            </NavLink>
                          </td>

                          <td>{employee.email}</td>
                          <td>{employee.dob.age} yrs</td>
                          <td>{employee.location.city}</td>
                          <td>{employee.phone}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="text-danger fw-bold py-4">
                          Loading employees...
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Employees;

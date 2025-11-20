import { useEffect, useState } from "react";
import axios from "axios";
import type { IEmployee } from "./models/IEmployee";
import { NavLink } from "react-router-dom";

const Employees: React.FC = () => {
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const dataURL =
      "https://gist.githubusercontent.com/thenaveensaggam/2c0a106c0b66ef2c8f4eb2b2c8c31e6d/raw/416efcc2300afc13cd0aa6413b2de4918a50ad30/contacts-02-12-2020.json";

    axios
      .get(dataURL)
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  }, []);

  return (
    <>
      <section className="mt-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 text-primary">Employees</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Aperiam blanditiis corporis delectus deserunt facere illo
                incidunt minima nam natus optio porro possimus qui quibusdam
                quod rem repellat, rerum tenetur voluptas!
              </p>

              {errorMessage && (
                <p className="text-danger fw-bold">{errorMessage}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            <div className="col">
              <table className="table table-striped table-hover text-center">
                <thead className="bg-dark text-primary">
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
                  {employees.length > 0 &&
                    employees.map((employee) => (
                      <tr key={employee.login.uuid}>
                        <td>
                          {employee.login.uuid.substr(
                            employee.login.uuid.length - 5
                          )}
                        </td>

                        <td>
                          <NavLink
                            to={`/employees/${employee.login.uuid}`}
                            className="text-primary"
                          >
                            {employee.name.title}. {employee.name.first}{" "}
                            {employee.name.last}
                          </NavLink>
                        </td>

                        <td>{employee.email}</td>
                        <td>{employee.dob.age} Yrs</td>
                        <td>{employee.location.city}</td>
                        <td>{employee.phone}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Employees;

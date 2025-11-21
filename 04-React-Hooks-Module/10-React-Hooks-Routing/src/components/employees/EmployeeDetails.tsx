import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import type { IEmployee } from "./models/IEmployee";

const EmployeeDetails: React.FC = () => {
  const { employeeId } = useParams<{ employeeId: string }>();

  const [selectedEmployee, setSelectedEmployee] = useState<IEmployee | null>(
    null
  );

  useEffect(() => {
    const dataURL =
      "https://gist.githubusercontent.com/thenaveensaggam/2c0a106c0b66ef2c8f4eb2b2c8c31e6d/raw/416efcc2300afc13cd0aa6413b2de4918a50ad30/contacts-02-12-2020.json";

    axios
      .get(dataURL)
      .then((response) => {
        const employees: IEmployee[] = response.data;
        const employee = employees.find((emp) => emp.login.uuid === employeeId);
        if (employee) setSelectedEmployee(employee);
      })
      .catch((err) => console.error(err));
  }, [employeeId]);

  return (
    <>
      <section className="mt-4">
        <div className="container">
          <h3 className="text-primary">Employee Details</h3>
          <p className="text-muted">
            Detailed information of the selected employee retrieved dynamically
            from server.
          </p>
        </div>
      </section>

      <section className="mb-5">
        <div className="container">
          {selectedEmployee ? (
            <div className="card shadow-sm rounded-3">
              <div className="card-header bg-primary text-white">
                <h4 className="mb-0">
                  {selectedEmployee.name.first} {selectedEmployee.name.last}
                </h4>
              </div>

              <div className="card-body bg-light">
                <div className="row align-items-center">
                  <div className="col-md-4">
                    <img
                      src={selectedEmployee.picture.large}
                      className="img-fluid img-thumbnail rounded"
                      alt="profile"
                    />
                  </div>

                  <div className="col-md-8">
                    <ul className="list-group">
                      <li className="list-group-item">
                        <strong>Age:</strong> {selectedEmployee.dob.age} yrs
                      </li>
                      <li className="list-group-item">
                        <strong>Phone:</strong> {selectedEmployee.phone}
                      </li>
                      <li className="list-group-item">
                        <strong>Email:</strong> {selectedEmployee.email}
                      </li>
                      <li className="list-group-item">
                        <strong>City:</strong>{" "}
                        {selectedEmployee.location.city}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="card-footer text-end">
                <NavLink to="/employees/list" className="btn btn-primary btn-sm">
                  Back
                </NavLink>
              </div>
            </div>
          ) : (
            <div className="text-center py-5">
              <div className="spinner-border text-primary"></div>
              <p className="mt-3 text-muted">Loading employee details...</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default EmployeeDetails;

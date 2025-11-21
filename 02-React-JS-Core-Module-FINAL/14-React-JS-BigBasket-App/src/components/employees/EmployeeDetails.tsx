import { useEffect, useState } from "react";
import axios from "axios";
import type { IEmployee } from "./models/IEmployee";
import { NavLink, useParams } from "react-router-dom";

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
        const single = employees.find(
          (emp) => emp.login.uuid === employeeId
        );

        setSelectedEmployee(single || null);
      })
      .catch(() => {});
  }, [employeeId]);

  return (
    <>
      <section className="mt-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 text-primary">Employee Details</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam
                blanditiis corporis delectus deserunt facere illo incidunt
                minima nam natus optio porro possimus qui quibusdam quod rem
                repellat, rerum tenetur voluptas!
              </p>
            </div>
          </div>
        </div>
      </section>

      {selectedEmployee && (
        <section>
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="card">
                  <div className="card-header bg-primary text-white">
                    <p className="h3">
                      {selectedEmployee.name.first}{" "}
                      {selectedEmployee.name.last}
                    </p>
                  </div>

                  <div className="card-body rgba-blue-light">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <img
                          src={selectedEmployee.picture.large}
                          alt=""
                          className="img-fluid img-thumbnail"
                        />
                      </div>

                      <div className="col-md-8">
                        <ul className="list-group">
                          <li className="list-group-item">
                            AGE : {selectedEmployee.dob.age} yrs
                          </li>
                          <li className="list-group-item">
                            Phone : {selectedEmployee.phone}
                          </li>
                          <li className="list-group-item">
                            Email : {selectedEmployee.email}
                          </li>
                          <li className="list-group-item">
                            Location : {selectedEmployee.location.city}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="card-footer">
                    <NavLink
                      to="/employees/list"
                      className="btn btn-primary btn-sm"
                    >
                      Back
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default EmployeeDetails;

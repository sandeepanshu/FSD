import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployeeData } from "../redux/employee/employee.slice";
import type { RootState, AppDispatch } from "../redux/store";

const EmployeeCards: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { employees, loading } = useSelector(
    (state: RootState) => state.employee
  );

  useEffect(() => {
    dispatch(fetchEmployeeData());
  }, [dispatch]);

  return (
    <>
      {/* Header */}
      <section className="py-4 bg-light border-bottom">
        <div className="container text-center">
          <h2 className="fw-bold text-primary">Employee Details</h2>
          <p className="text-muted">
            List of employees fetched from Redux Toolkit async thunk.
          </p>
        </div>
      </section>

      {/* Employees Section */}
      <section className="py-4">
        <div className="container">
          <div className="row g-4">
            {/* Loading */}
            {loading && (
              <div className="text-center">
                <div className="spinner-border text-primary"></div>
              </div>
            )}

            {/* Employee Cards */}
            {!loading &&
              employees.map((employee) => (
                <div className="col-md-4" key={employee.sno}>
                  <div className="card shadow-lg border-0 rounded-4 h-100">
                    <div className="card-body p-4">
                      <h5 className="fw-bold text-dark mb-3">
                        #{employee.sno} — {employee.name}
                      </h5>

                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                          <strong>Age:</strong> {employee.age}
                        </li>
                        <li className="list-group-item">
                          <strong>Designation:</strong> {employee.designation}
                        </li>
                        <li className="list-group-item">
                          <strong>Location:</strong> {employee.location}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default EmployeeCards;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../redux/user/user.slice";
import type { AppDispatch, RootState } from "../redux/store";
import Spinner from "./layout/Spinner";

const UserList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, errorMessage } = useSelector(
    (state: RootState) => state.user
  );

  const clickGetUsers = () => {
    dispatch(fetchUsers());
  };

  return (
    <>
      {/* Header Section */}
      <section className="py-4 bg-light border-bottom text-center">
        <div className="container">
          <h2 className="fw-bold text-primary">User List</h2>
          <p className="text-muted">
            Fetch users from API using Redux Toolkit.
          </p>
          <button
            onClick={clickGetUsers}
            className="btn btn-success btn-lg mt-3"
          >
            Load Users
          </button>
        </div>
      </section>

      {/* User Table Section */}
      <section className="py-4">
        <div className="container">
          {loading && <Spinner />}

          {errorMessage && (
            <div className="alert alert-danger text-center">{errorMessage}</div>
          )}

          {!loading && users.length > 0 && (
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body">
                <table className="table table-hover text-center align-middle table-striped mb-0">
                  <thead className="bg-dark text-primary">
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Website</th>
                      <th>City</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="fw-bold">{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{user.website}</td>
                        <td>{user.address.city}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default UserList;

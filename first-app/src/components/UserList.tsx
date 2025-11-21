import React, { useEffect, useState } from "react";
import type { IUser } from "./IUser";
import axios from "axios";

interface IState {
  users: IUser[];
}

const UserList: React.FC = () => {
  const [userState, setUserState] = useState<IState>({
    users: [] as IUser[],
  });

  useEffect(() => {
    // component Did Mount
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUserState({
          users: response.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });

    // component will unmount
    return () => {
      setUserState({
        users: [] as IUser[],
      });
    };
  }, []);

  return (
    <>
      <section className="mt-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <table className="table table-hover text-center table-primary table-striped">
                <thead>
                  <tr>
                    <th>SNO</th>
                    <th>NAME</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Website</th>
                    <th>Location</th>
                  </tr>
                </thead>
                <tbody>
                  {userState.users.length > 0 &&
                    userState.users.map((user) => {
                      return (
                        <tr key={user.id}>
                          <td>{user.id}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.phone}</td>
                          <td>{user.website}</td>
                          <td>{user.address.city}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserList;

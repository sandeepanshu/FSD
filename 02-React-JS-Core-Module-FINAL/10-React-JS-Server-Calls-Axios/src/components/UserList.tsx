import { useEffect, useState } from "react";
import axios from "axios";
import type { User } from "./User";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const dataURL = "https://jsonplaceholder.typicode.com/users";

    axios
      .get<User[]>(dataURL)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []); // runs once like componentDidMount

  return (
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
                {users.length > 0 &&
                  users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
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
      </div>
    </section>
  );
};

export default UserList;

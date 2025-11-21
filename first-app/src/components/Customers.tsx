import React from "react";
import type { ICustomer } from "./CustomerStore";
import { CustomerStore } from "./CustomerStore";

const Customers: React.FC = () => {
  const customers: ICustomer[] = CustomerStore.customerData;

  return (
    <section className="mt-3">
      <div className="container">
        <div className="row">
          <div className="col">
            <p className="h3 text-primary">Customer Details</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
              aliquam, beatae cumque delectus dolores eveniet itaque.
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <table className="table table-hover text-center table-striped">
              <thead className="bg-dark text-white">
                <tr>
                  <th>SNO</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Email</th>
                  <th>Location</th>
                </tr>
              </thead>

              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.login.uuid}>
                    <td>{customer.login.uuid.slice(-5)}</td>
                    <td>
                      <img
                        src={customer.picture.large}
                        alt="profile"
                        width="50"
                        height="50"
                      />
                    </td>
                    <td>
                      {customer.name.first} {customer.name.last}
                    </td>
                    <td>{customer.dob.age} yrs</td>
                    <td>{customer.email}</td>
                    <td>{customer.location.city}</td>
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

export default Customers;

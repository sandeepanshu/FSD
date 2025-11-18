import React, { useState } from "react";

interface IEmployee {
  sno: string;
  name: string;
  age: number;
  designation: string;
  location: string;
}

const EmployeeCards: React.FC = () => {
  const [employees] = useState<IEmployee[]>([
    {
      sno: "AA00101",
      name: "Rajan",
      age: 25,
      designation: "Software Engineer",
      location: "Bangalore",
    },
    {
      sno: "AA00102",
      name: "Mahesh",
      age: 28,
      designation: "Sr.Software Engineer",
      location: "Bangalore",
    },
    {
      sno: "AA00103",
      name: "John",
      age: 45,
      designation: "Project Manager",
      location: "Bangalore",
    },
    {
      sno: "AA00104",
      name: "Wilson",
      age: 48,
      designation: "Director",
      location: "Bangalore",
    },
  ]);

  return (
    <section className="mt-3">
      <div className="container">
        <div className="row">
          <div className="col">
            <p className="h3">Employee Details</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
              aliquam, beatae cumque delectus dolores eveniet itaque maxime
              molestiae nemo nulla pariatur perferendis ratione rem repellat
              similique, sint sit temporibus veritatis.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            {employees.map((employee) => (
              <div key={employee.sno} className="card my-2">
                <div className="card-body rgba-blue-grey-light">
                  <ul className="list-group">
                    <li className="list-group-item">{employee.sno}</li>
                    <li className="list-group-item">{employee.name}</li>
                    <li className="list-group-item">{employee.age}</li>
                    <li className="list-group-item">{employee.designation}</li>
                    <li className="list-group-item">{employee.location}</li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmployeeCards;

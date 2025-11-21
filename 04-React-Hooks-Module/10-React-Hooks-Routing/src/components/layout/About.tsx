import React from "react";

const About: React.FC = () => {
  return (
    <>
      <section className="mt-4">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 text-primary">About Us</p>
              <p className="text-muted">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Aperiam blanditiis corporis delectus deserunt facere illo
                incidunt minima nam natus optio porro possimus qui quibusdam
                quod rem repellat, rerum tenetur voluptas!
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-3">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <ul className="list-group shadow-sm">
                <li className="list-group-item d-flex justify-content-between">
                  <span>NAME</span>
                  <span className="fw-bold text-primary">React Routing</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Version</span>
                  <span className="fw-bold text-primary">1.0.2</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;

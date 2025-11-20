import { Link } from "react-router-dom";

const UserRegister: React.FC = () => {
  return (
    <>
      <section className="p-3">
        <div className="container">
          <div className="row animated zoomIn">
            <div className="col">
              <p className="h3 text-primary">
                <i className="fa fa-user-shield" /> Registration
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Adipisci consectetur consequuntur culpa ea, ex ipsam ipsum
                molestiae nesciunt repellendus reprehenderit sed totam.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row animated zoomIn">
            <div className="col-md-8">
              <form>
                <div className="form-group mb-2">
                  <input
                    name="name"
                    type="text"
                    className="form-control"
                    placeholder="Name"
                  />
                </div>

                <div className="form-group mb-2">
                  <input
                    name="email"
                    type="text"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>

                <div className="form-group mb-2">
                  <input
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="Password"
                  />
                </div>

                <div>
                  <input
                    type="submit"
                    className="btn btn-primary btn-sm"
                    value="Register"
                  />
                </div>
              </form>

              <small>
                Already have an account?
                <Link to="/users/login" className="font-weight-bold text-teal">
                  {" "}
                  Login
                </Link>
              </small>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserRegister;

import React, { useRef } from "react";

const Register: React.FC = () => {
  const submitEl = useRef<HTMLInputElement | null>(null);

  const updateCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (submitEl.current) {
      submitEl.current.disabled = !event.target.checked;
    }
  };

  return (
    <>
      <section className="mt-3">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="card">
                <div className="card-header bg-secondary text-white">
                  <p className="h3">Registration</p>
                </div>

                <div className="card-body bg-light">
                  <form>
                    <div className="form-check mb-2">
                      <input
                        name="terms"
                        onChange={updateCheck}
                        type="checkbox"
                        className="form-check-input"
                      />
                      <label className="form-check-label">Accept Terms</label>
                    </div>

                    <div className="form-group mb-2">
                      <input
                        ref={submitEl}
                        type="submit"
                        className="btn btn-secondary btn-sm"
                        value="Register"
                        disabled
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;

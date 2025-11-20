import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import type { UserInfo } from "./components/props-drilling/UserInfo";
import ComponentA from "./components/props-drilling/ComponentA";
import ComponentOne from "./components/context-api/ComponentOne";
import UserContext from "./components/context-api/UserContext";
import DigitalWatch from "./components/life-cycle/DigitalWatch";

function App() {
  const [userInfo] = useState<UserInfo>({
    author: "SANDEEP SHARMA",
    email: "sandeepks9199@gmail.com",
  });

  return (
    <>
      <NavBar />
      {/* ------------------------------------------------------ */}
      {/* Props Drilling Example */}
      {/* ------------------------------------------------------ */}
      <section className="mt-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-body bg-success text-white">
                  <p className="h4">App Component (Props Drilling)</p>
                  <small>{JSON.stringify(userInfo)}</small>

                  <ComponentA userInfo={userInfo} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ */}
      {/* Context API Example */}
      {/* ------------------------------------------------------ */}

      <section className="mt-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-body bg-primary text-white">
                  <p className="h4">App Component (Context API)</p>
                  <small>{JSON.stringify(userInfo)}</small>

                  <UserContext.Provider value={userInfo}>
                    <ComponentOne />
                  </UserContext.Provider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Life Cycle Example (Digital Watch) */}
      {/* ------------------------------------------------------ */}
      <DigitalWatch />
      <Footer />
    </>
  );
}

export default App;

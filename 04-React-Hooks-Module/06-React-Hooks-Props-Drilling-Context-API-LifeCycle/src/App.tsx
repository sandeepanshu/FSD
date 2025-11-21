import { BrowserRouter as Router, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import DigitalWatch from "./components/life-cycle/DigitalWatch";
import ComponentA from "./components/props-drilling/ComponentA";
import { useState } from "react";
import type { UserInfo } from "./components/props-drilling/UserInfo";
import UserContext from "./components/context-api/UserContext";
import ComponentOne from "./components/context-api/ComponentOne";
interface IState {
  userInfo: UserInfo;
}
function App() {
  const [appState, setAppState] = useState<IState>({
    userInfo: {
      author: "SANDEEP SHARMA",
      email: "sandeepks9199@gmail.com",
    },
  });

  return (
    <>
      <Router>
        <NavBar />
        {/* Props Drilling Concept */}
        <section className="mt-3">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="card">
                  <div className="card-body bg-success text-white">
                    <p className="h4">App Component</p>
                    <small>{JSON.stringify(appState.userInfo)}</small>
                    <ComponentA userInfo={appState.userInfo} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Context API */}
        <section className="mt-3">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="card">
                  <div className="card-body bg-success text-white">
                    <p className="h4">App Component</p>
                    <small>{JSON.stringify(appState.userInfo)}</small>

                    <UserContext.Provider value={appState.userInfo}>
                      <ComponentOne />
                    </UserContext.Provider>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Life Cycle */}
        <DigitalWatch />

        <Routes></Routes>
      </Router>
    </>
  );
}

export default App;

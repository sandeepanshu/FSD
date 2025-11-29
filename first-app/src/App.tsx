import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router-dom";

/* Pages */
import Home from "./pages/home/Home";
import ReceipeList from "./pages/receipe-list/ReceipeList";
import ReceipeDetails from "./pages/receipe-details/ReceipeDetails";

/* Ionic Core CSS */
import "@ionic/react/css/core.css";

/* Basic CSS */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional utilities */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>

        {/* Redirect root → /home */}
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>

        {/* Home Page */}
        <Route exact path="/home">
          <Home />
        </Route>

        {/* Receipe List */}
        <Route exact path="/receipes">
          <ReceipeList />
        </Route>

        {/* Receipe Details */}
        <Route exact path="/receipes/:receipeId">
          <ReceipeDetails />
        </Route>

      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;

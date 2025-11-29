import { IonContent, IonHeader, IonPage, IonToolbar, IonTitle, IonButton } from '@ionic/react';
import './Home.css';
import React from "react";

const Home: React.FC = () => {
  return (
    <IonPage>

      {/* Optional Toolbar */}
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Recipe App</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="full-screen">
          <div className="overlay">
            <div className="content">
              <IonButton
                color="danger"
                expand="block"
                shape="round"
                routerLink="/receipes"
                className="home-button"
              >
                🍽️ View Recipes
              </IonButton>
            </div>
          </div>
        </div>
      </IonContent>

    </IonPage>
  );
};

export default Home;

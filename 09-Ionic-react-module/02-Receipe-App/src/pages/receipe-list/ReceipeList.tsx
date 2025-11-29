import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonList,
  IonItem,
  IonAvatar,
  IonImg,
  IonLabel
} from "@ionic/react";

import React, { useState } from "react";
import type { Receipe } from "../../models/Receipe";

import { ReceipeService } from "../../services/ReceipeService";

interface IState {
  receipes: Receipe[];
}

const ReceipeList: React.FC = () => {
  const [state] = useState<IState>({
    receipes: ReceipeService.getReceipes(),
  });

  return (
    <IonPage>

      <IonHeader>
        <IonToolbar color="danger">
          <IonButtons slot="start">
            <IonBackButton text="Back" defaultHref="/home" />
          </IonButtons>
          <h2 style={{ marginLeft: "16px", color: "white" }}>Kitchen Recipes</h2>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>

        <IonList>
          {state.receipes.map((receipe) => (
            <IonItem key={receipe.id} routerLink={`/receipes/${receipe.id}`} button detail={true}>
              <IonAvatar slot="start">
                <IonImg src={receipe.imageUrl} />
              </IonAvatar>
              <IonLabel>{receipe.name}</IonLabel>
            </IonItem>
          ))}
        </IonList>

      </IonContent>

    </IonPage>
  );
};

export default ReceipeList;

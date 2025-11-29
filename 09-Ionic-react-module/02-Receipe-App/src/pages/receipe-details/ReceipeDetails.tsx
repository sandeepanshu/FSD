import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonImg,
  IonList,
  IonItem,
  IonLabel,
  IonText
} from "@ionic/react";

import { useParams } from "react-router";
import React, { useEffect, useState } from "react";
import type { Receipe } from "../../models/Receipe";
import { ReceipeService } from "../../services/ReceipeService";

interface URLParams {
  receipeId: string;
}

const ReceipeDetails: React.FC = () => {
  const { receipeId } = useParams<URLParams>();

  const [selectedReceipe, setSelectedReceipe] = useState<Receipe | null>(null);

  useEffect(() => {
    const recipe = ReceipeService.getReceipe(receipeId);
    if (recipe) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedReceipe(recipe);
    }
  }, [receipeId]); // ← FIXED

  if (!selectedReceipe) {
    return (
      <IonPage>
        <IonContent className="ion-padding">
          <IonText>Loading...</IonText>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="danger">
          <IonButtons slot="start">
            <IonBackButton text="Back" defaultHref="/receipes" />
          </IonButtons>
          <h2 style={{ marginLeft: "16px", color: "white" }}>
            {selectedReceipe.name}
          </h2>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>

        <IonImg src={selectedReceipe.imageUrl} />

        <IonList>
          {selectedReceipe.ingredients.map((ingredient, index) => (
            <IonItem key={index}>
              <IonLabel>{ingredient}</IonLabel>
            </IonItem>
          ))}

          <IonItem lines="none">
            <IonText>
              <p style={{ padding: "10px" }}>{selectedReceipe.description}</p>
            </IonText>
          </IonItem>
        </IonList>

      </IonContent>
    </IonPage>
  );
};

export default ReceipeDetails;

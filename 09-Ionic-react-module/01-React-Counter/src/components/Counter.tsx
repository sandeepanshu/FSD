import React, { useState } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonText,
  IonButton,
  IonButtons
} from "@ionic/react";

const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  const incr = () => setCount((prev) => prev + 1);
  const decr = () => setCount((prev) => (prev - 1 > 0 ? prev - 1 : 0));

  return (
    <IonGrid className="ion-padding">
      <IonRow>
        <IonCol size="12" sizeMd="6" className="ion-margin-auto">
          <IonCard>
            <IonCardContent className="ion-text-center">

              <IonText color="primary">
                <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>
                  {count}
                </h1>
              </IonText>

              <IonButtons className="ion-justify-content-center" style={{ marginTop: "20px" }}>

                <IonButton
                  onClick={incr}
                  color="success"
                  expand="full"
                  shape="round"
                  style={{ marginBottom: "12px", fontSize: "18px", padding: "12px" }}
                >
                  ➕ Increment
                </IonButton>

                <IonButton
                  onClick={decr}
                  color="danger"
                  expand="full"
                  shape="round"
                  style={{ fontSize: "18px", padding: "12px" }}
                >
                  ➖ Decrement
                </IonButton>

              </IonButtons>

            </IonCardContent>
          </IonCard>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default Counter;

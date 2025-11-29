import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import Counter from "../src/components/Counter";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>React Counter</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <Counter />
      </IonContent>
    </IonPage>
  );
};

export default Home;

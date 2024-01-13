import '@ionic/react/css/core.css';
import logo from './logo.svg';
import './Home.css';
import { IonButton, IonDatetime, IonContent, IonPage, setupIonicReact } from '@ionic/react';

setupIonicReact();

const App = () => {
  return (
    <IonPage>
      <IonContent>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>iJournal</code> and save to reload.
            </p>

            <p>This will be the main or 'sign in' page</p>

            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default App;

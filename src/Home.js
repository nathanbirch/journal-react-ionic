import '@ionic/react/css/core.css';
import logo from './logo.svg';
import './Home.css';
import { IonButton, IonDatetime, IonContent, IonPage, setupIonicReact } from '@ionic/react';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import config from './amplifyconfiguration.json';
Amplify.configure(config);
setupIonicReact();

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => 
    <IonPage>
      <IonContent>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>iJournal</code> and save to reload.
            </p>

            <h1>
            Welcome {user.username}
            </h1>

            <p>
            <button onClick={signOut}>Sign out</button>
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
}</Authenticator>
    );
}

export default App;

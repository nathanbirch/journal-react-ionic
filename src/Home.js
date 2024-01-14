import '@ionic/react/css/core.css';
import logo from './logo.svg';
import './Home.css';
import { IonHeader, IonButton, IonDatetime, IonContent, IonPage, setupIonicReact, IonFooter, IonToolbar } from '@ionic/react';
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

      <IonHeader>
      <IonToolbar>
        <div>
          <h1 className="Home-header">Welcome {capitalizeFirstLetter(user.username)}</h1>
        </div>
      </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="Home">
          <main className="Home-main">
            {/*<img src={logo} className="App-logo" alt="logo" />*/}
            
            <p>This will be the main page</p>
            <br></br>
            <p><button onClick={signOut}>Sign out</button></p>
            <br></br>
            <p>This is testing for pulling data from amplify. The journal entries will be pulled and put down here \/</p>
            

          </main>
        </div>
      </IonContent>

        <IonFooter translucent={true}>
          <IonToolbar>
              <div className="footer_text">
              <h1>FOOTER</h1>
              </div>
          </IonToolbar>
        </IonFooter>

      </IonPage>

}</Authenticator>
    );
}



function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default App;

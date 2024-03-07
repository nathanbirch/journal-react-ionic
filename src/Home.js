import React, { useState } from 'react';
import { IonButton, IonContent, IonPage, IonIcon, setupIonicReact } from '@ionic/react';
import { menu } from 'ionicons/icons';
import '@ionic/react/css/core.css';
import './Home.css';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { components, formFields } from './components.js'
//import formFields from './formfields.js';

import aswExports from './aws-exports';
Amplify.configure(aswExports);
setupIonicReact();

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  

  return (
    <Authenticator formFields={formFields} components={components}>
      {({ signOut, user }) => 
    <IonPage>
      <IonContent>
        <div className="Home">
          <main className="Home-main">
          <h1>Welcome {user ? capitalizeFirstLetter(user.username) : ''}</h1>
            <IonButton className='signout_button' onClick={signOut}>Sign out</IonButton>

            {/*for menu button in upper left corner*/}
            <IonButton className="menu_button">
              <IonIcon icon={menu}/>
            </IonButton>

            <Calendar
              onChange={date => setSelectedDate(date)}
              value={selectedDate}
              locale="en-US"
              className='calendar'
              />            


          </main>
        </div>
      </IonContent>
      </IonPage>

}</Authenticator>
    );
}




//const ListEntries = await DataStore.query(Entry);
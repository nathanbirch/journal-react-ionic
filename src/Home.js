import React, { useState, useEffect} from 'react';
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }
    
  useEffect(() => {
    // Function to handle outside click
    function handleOutsideClick(event) {
      // Close the sidebar if the click is outside of the sidebar
      if (!event.target.closest('.sidebar') && !event.target.closest('.menu_button')) {
        setIsSidebarOpen(false);
      }
    }
  

    if (isSidebarOpen) {
      document.addEventListener('click', handleOutsideClick);
    }
  
    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isSidebarOpen]);

  
  
  

  return (
    <Authenticator formFields={formFields} components={components}>
      {({ signOut, user }) => 
    <IonPage>
      <IonContent>
        <div className="Home">
          <main className="Home-main">
          <h1>Welcome {user ? capitalizeFirstLetter(user.username) : ''}</h1>

            {/*for menu button in upper left corner*/}
            <IonButton className="menu_button" onClick={toggleSidebar}>
              <IonIcon icon={menu}/>
            </IonButton>

            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
            {/* Sidebar content goes here */}
            <div className="sidebar-content">
              <h2>Sidebar topics</h2>
              <h2></h2>
              <IonButton className='signout_button' onClick={signOut}>Sign out</IonButton>
            </div>
            </div>

            <Calendar
              onChange={date => setSelectedDate(date)}
              value={selectedDate}
              locale="en-US"
              className='calendar'/>            


          </main>
        </div>
      </IonContent>
      </IonPage>

}</Authenticator>
    );
}




//const ListEntries = await DataStore.query(Entry);
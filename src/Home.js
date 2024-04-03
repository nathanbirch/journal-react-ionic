import React, { useState } from 'react';
import { IonButton, IonContent, IonPage, IonIcon, setupIonicReact } from '@ionic/react';
import { menu, add } from 'ionicons/icons';
import Calendar from 'react-calendar';
import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import config from './aws-exports';
import '@ionic/react/css/core.css';
import 'react-calendar/dist/Calendar.css';
import '@aws-amplify/ui-react/styles.css';
import './Home.css';
import { components, formFields } from './components';

Amplify.configure(config);
setupIonicReact();

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [bubbleAnimation, setBubbleAnimation] = useState(false);
  const [showEntriesModal, setShowEntriesModal] = useState(false);
  const [currentEntries, setCurrentEntries] = useState([]);

  const handleMenuClick = () => {
    setBubbleAnimation(true);
    toggleSidebar();
    setTimeout(() => setBubbleAnimation(false), 500);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleDateClick = async (date) => {
    setSelectedDate(date);
    // TODO: Fetch the entries for the selected date
    const entriesForDate = []; // Replace with actual data fetching logic
    setCurrentEntries(entriesForDate);
    setShowEntriesModal(true);
  };

  const EntriesModal = ({ isOpen, onClose, entries }) => {
    if (!isOpen) return null;
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Entries for {selectedDate.toDateString()}</h2>
          <ul>
            {entries.length > 0 ? (
              entries.map((entry, index) => <li key={index}>{entry.content}</li>)
            ) : (
              <p>No entries for this date.</p>
            )}
          </ul>
          <IonButton onClick={onClose}>Close</IonButton>
        </div>
      </div>
    );
  };

  return (
    <Authenticator formFields={formFields} components={components}>
      {({ signOut, user }) => (
        <IonPage>
          <IonContent>
            <div className="Home">
              <main className="Home-main">
                <h1 className="welcome-message">Welcome {user ? capitalizeFirstLetter(user.username) : ''}</h1>
                <IonButton className={`menu_button ${bubbleAnimation ? 'bubble-animation' : ''}`} color="medium" onClick={handleMenuClick}>
                  <IonIcon icon={menu} />
                </IonButton>

                <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                  <div className="sidebar-content">
                    <h2>Sidebar Topics</h2>
                    <IonButton className='signout_button' color="medium" onClick={signOut}>Sign out</IonButton>
                  </div>
                </div>

                <Calendar
                  onChange={handleDateClick}
                  value={selectedDate}
                  locale="en-US"
                  className='calendar'
                />

                <EntriesModal
                  isOpen={showEntriesModal}
                  onClose={() => setShowEntriesModal(false)}
                  entries={currentEntries}
                />

                {/* Floating Action Button */}
                <IonButton
                  className="fab"
                  onClick={() => {
                    // TODO: handle the click event for adding a new entry
                  }}>
                  <IonIcon icon={add} />
                </IonButton>

              </main>
            </div>
          </IonContent>
        </IonPage>
      )}
    </Authenticator>
  );
}

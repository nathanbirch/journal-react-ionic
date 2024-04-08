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
  const [entries, setEntries] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [bubbleAnimation, setBubbleAnimation] = useState(false);
  const [showEntriesModal, setShowEntriesModal] = useState(false);
  const [currentEntries, setCurrentEntries] = useState([]);
  const [showAddEntryModal, setShowAddEntryModal] = useState(false);
  const [entryTime, setEntryTime] = useState('');
  const [entryText, setEntryText] = useState('');

  const handleMenuClick = () => {
    setBubbleAnimation(true);
    toggleSidebar();
    setTimeout(() => setBubbleAnimation(false), 500);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    const entriesForDate = entries.filter((entry) => entry.date === date.toISOString().split('T')[0]);
    setCurrentEntries(entriesForDate);
    setShowEntriesModal(true);
    setShowAddEntryModal(false);
  };

  const addEntry = () => {
    const newEntry = {
      date: selectedDate.toISOString().split('T')[0],
      time: entryTime,
      text: entryText,
    };
    setEntries([...entries, newEntry]);
    setEntryTime('');
    setEntryText('');
    setShowAddEntryModal(false);
  };

  return (
    <Authenticator formFields={formFields} components={components}>
      {({ signOut, user }) => (
        <IonPage>
          <IonContent>
            <div className="Home">
              <main className="Home-main">
                <h1 className="welcome-message">Welcome {user ? user.username : 'Guest'}</h1>
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

                {showEntriesModal && (
                  <div className="modal-overlay" onClick={() => setShowEntriesModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                      <h2>Entries for {selectedDate.toDateString()}</h2>
                      <ul>
                        {currentEntries.length > 0 ? (
                          currentEntries.map((entry, index) => (
                            <li key={index}>{`${entry.time} - ${entry.text}`}</li>
                          ))
                        ) : (
                          <p>No entries for this date.</p>
                        )}
                      </ul>
                      <IonButton onClick={() => setShowEntriesModal(false)}>Close</IonButton>
                    </div>
                  </div>
                )}

                {showAddEntryModal && (
                  <>
                    <div className="modal-overlay" onClick={() => setShowAddEntryModal(false)}></div>
                    <div className="add-entry-modal">
                      <h2>Add New Entry</h2>
                      <input 
                        type="time" 
                        value={entryTime} 
                        onChange={(e) => setEntryTime(e.target.value)} 
                        placeholder="Time of Entry" 
                      />
                      <textarea 
                        value={entryText} 
                        onChange={(e) => setEntryText(e.target.value)} 
                        placeholder="Entry Description"
                      ></textarea>
                      <IonButton onClick={addEntry}>Save Entry</IonButton>
                      <IonButton onClick={() => setShowAddEntryModal(false)}>Close</IonButton>
                    </div>
                  </>
                )}

                <IonButton
                  className="fab"
                  onClick={() => setShowAddEntryModal(true)}>
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

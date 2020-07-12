import React from 'react';
import logo from './logo.svg';
import { ReminderForm } from './components/ReminderForm';
import { Calendar } from './components/Calendar';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <ReminderForm />
        </div>
        <div>
          <h3>Reminders</h3>
          <Calendar />
        </div>
      </header>
    </div>
  );
}

export default App;

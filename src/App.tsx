import React from 'react';
import LineGraph from './components/LineGraph';
import Maps from './components/Maps';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import ContactDetails from './components/ContactDetails';
import './App.css';

const App: React.FC = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="App">
          <nav className="sidebar">
            <Link to="/" className="nav-link">
              Contacts
            </Link>
            <Link to="/map" className="nav-link">
              Map
            </Link>
          </nav>
          <div className="content">
            <Routes>
              <Route path="/" element={<Contacts />} />
              <Route path="/:id" element={<ContactDetails />} />
              <Route path="/map" element={<Map />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

const Contacts: React.FC = () => {
  return (
    <div className='contact'>
      <div className="mb-4 form">
        <ContactForm />
      </div>
      <div className="mt-1">
        <ContactList />
      </div>
    </div>
  );
};

const Map: React.FC = () => {
  return (
    <div className="Map">
      <div className="w-full graph">
        <LineGraph />
      </div>
      <div className="w-full mb-4">
        <Maps />
      </div>
    </div>
  );
};

export default App;

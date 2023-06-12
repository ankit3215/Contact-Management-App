import React, { useState } from 'react';
import { useContacts } from '../hooks/useContacts';
import { Contact } from '../types';
import './ContactForm.css';

const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { addNewContact } = useContacts();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !phone || !status) {
      setError('Please fill in all fields');
      return;
    }

    if (!/^([a-zA-Z]+\s)*[a-zA-Z]+$/.test(name.trim())) {
      setError('Invalid name format');
      return;
    }

    if (!/^\d+$/.test(phone)) {
      setError('Phone should only consist of numbers');
      return;
    }

    const newContact: Contact = {
      id: Date.now(),
      name,
      email,
      phone,
      status,
    };
    addNewContact(newContact);
    setName('');
    setEmail('');
    setPhone('');
    setStatus('');
    setError('');
    setIsFormOpen(false);
  };

  const handleCreateContact = () => {
    setIsFormOpen(true);
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setError('');
  };

  return (
    <div className="contact">
      {!isFormOpen && (
        <button
          type="button"
          onClick={handleCreateContact}
          className="px-8 py-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-200"
        >
          Create Contact
        </button>
      )}

      {isFormOpen && (
        <form
          onSubmit={handleSubmit}
          className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="bg-white p-6 rounded-md">
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="tel"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full mt-2 py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex mt-2">
              <p className="mr-4">Status:</p>
              <label htmlFor="active" className="mr-2">
                <input
                  type="checkbox"
                  id="active"
                  checked={status === 'active'}
                  onChange={() => setStatus('active')}
                />
                Active
              </label>
              <label htmlFor="inactive">
                <input
                  type="checkbox"
                  id="inactive"
                  checked={status === 'inactive'}
                  onChange={() => setStatus('inactive')}
                />
                Inactive
              </label>
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-200 mr-2"
              >
                Add Contact
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-300 text-gray-600 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400 transition duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactForm;

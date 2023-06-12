import React, { useState, useRef, useEffect } from 'react';
import { useContacts } from '../hooks/useContacts';
import { Contact } from '../types';

const ContactList: React.FC = () => {
  const { contacts, editContact, removeContact } = useContacts();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedPhone, setEditedPhone] = useState('');
  const [editedStatus, setEditedStatus] = useState('');

  const handleContactClick = (contact: Contact) => {
    setSelectedContact(contact);
  };

  const handleEditContact = (contact: Contact) => {
    setSelectedContact(contact);
    setEditingContact(contact);
    setEditedName(contact.name);
    setEditedEmail(contact.email);
    setEditedPhone(contact.phone);
    setEditedStatus(contact.status);
  };

  const handleCancelEdit = () => {
    setEditingContact(null);
  };

  const handleDoneEdit = () => {
    if (editingContact) {
      const updatedContact: Contact = {
        ...editingContact,
        name: editedName,
        email: editedEmail,
        phone: editedPhone,
        status: editedStatus,
      };
      editContact(updatedContact);
      setEditingContact(null);
      setSelectedContact(updatedContact);
    }
  };

  const handleDeleteContact = (contact: Contact) => {
    removeContact(contact.id);
    setSelectedContact(null);
    setEditingContact(null);
  };

  const handleClosePopup = () => {
    setSelectedContact(null);
    setEditingContact(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        handleClosePopup();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      {contacts.length === 0 ? (
        <div className="flex items-center justify-center">
          <div className="bg-gray-300 p-4 inline-flex">
            <span className="text-gray-800">
              No Contact Found. Please add a contact from Create Contact Button.
            </span>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {contacts.map((contact) => (
            <div
            key={contact.id}
            className="bg-blue-200 rounded-lg shadow p-4 cursor-pointer flex flex-col items-center justify-center w-88 h-56"
            onClick={() => handleContactClick(contact)}
          >
            <h3 className="text-lg font-semibold text-center">{contact.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{contact.phone}</p>
            </div>
          ))}
        </div>
      )}
      {selectedContact && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
          <div ref={popupRef} className="bg-white p-6 rounded-md">
            {editingContact ? (
              <>
                <div className="bg-white p-6 rounded-md">
                  <p>Edit Contact</p>
                  <input
                    type="text"
                    className="w-full py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                  />
                  <input
                    type="email"
                    className="w-full py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                  />
                  <input
                    type="tel"
                    className="w-full py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={editedPhone}
                    onChange={(e) => setEditedPhone(e.target.value)}
                  />
                  <div className="mt-4">
                    <label htmlFor="active">
                      <input
                        type="checkbox"
                        id="active"
                        checked={editedStatus === 'active'}
                        onChange={() => setEditedStatus('active')}
                      />
                      Active
                    </label>
                    <label htmlFor="inactive">
                      <input
                        type="checkbox"
                        id="inactive"
                        checked={editedStatus === 'inactive'}
                        onChange={() => setEditedStatus('inactive')}
                      />
                      Inactive
                    </label>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button className="mr-2" onClick={handleCancelEdit}>
                    Cancel
                  </button>
                  <button className="text-blue-500" onClick={handleDoneEdit}>
                    Done
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-xl font-semibold mb-4">{selectedContact.name}</h3>
                <p className="text-gray-600 mb-2">Email: {selectedContact.email}</p>
                <p className="text-gray-600 mb-4">Phone: {selectedContact.phone}</p>
                <p className="text-gray-600 mb-4">Status: {selectedContact.status}</p>
                <div className="flex justify-end">
                  <button className="mr-2" onClick={() => handleEditContact(selectedContact)}>
                    Edit
                  </button>
                  <button
                    className="text-red-500"
                    onClick={() => handleDeleteContact(selectedContact)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
            <button className="absolute top-2 right-2 text-gray-500" onClick={handleClosePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactList;

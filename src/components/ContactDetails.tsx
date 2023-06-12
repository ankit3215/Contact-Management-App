// src/components/ContactDetails.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useContacts } from '../hooks/useContacts';

const ContactDetails: React.FC = () => {
  const { contacts } = useContacts();
  const { id } = useParams<{ id: string | any}>();
  const contactId = parseInt(id, 10);
  const contact = contacts.find((contact) => contact.id === contactId);

  if (!contact) {
    return <div>Contact not found</div>;
  }

  return (
    <div>
      <h2>{contact.name}</h2>
      <p>Email: {contact.email}</p>
      <p>Phone: {contact.phone}</p>
      <p>Status: {contact.status}</p>
    </div>
  );
};

export default ContactDetails;

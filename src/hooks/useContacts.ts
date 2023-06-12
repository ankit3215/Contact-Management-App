// src/hooks/useContacts.ts
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addContact, updateContact, deleteContact } from '../store/contactsSlice';
import { Contact } from '../types';

export const useContacts = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state: RootState) => state.contacts.contacts);

  const addNewContact = (contact: Contact) => {
    dispatch(addContact(contact));
  };

  const editContact = (contact: Contact) => {
    dispatch(updateContact(contact));
  };

  const removeContact = (contactId: number) => {
    dispatch(deleteContact(contactId));
  };

  return {
    contacts,
    addNewContact,
    editContact,
    removeContact,
  };
};

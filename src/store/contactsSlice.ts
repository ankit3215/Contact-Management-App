// src/store/contactsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contact } from '../types';

interface ContactsState {
  contacts: Contact[];
}

const initialState: ContactsState = {
  contacts: [],
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact(state, action: PayloadAction<Contact>) {
      state.contacts.push(action.payload);
    },
    updateContact(state, action: PayloadAction<Contact>) {
      const { id } = action.payload;
      const existingContact = state.contacts.find((contact) => contact.id === id);
      if (existingContact) {
        Object.assign(existingContact, action.payload);
      }
    },
    deleteContact(state, action: PayloadAction<number>) {
      state.contacts = state.contacts.filter((contact) => contact.id !== action.payload);
    },
  },
});

export const { addContact, updateContact, deleteContact } = contactsSlice.actions;
export default contactsSlice.reducer;

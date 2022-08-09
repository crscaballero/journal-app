import { createStore } from 'vuex';

import journal from '@/modules/daybook/store/journal';
import { journalState } from '../../../../mock-data/test-journal-state';

const createVuexStore = (initialState) => createStore({
    modules: {
        journal: {
            ...journal,
            state: { ...initialState }
        }
    }
});


describe('Vuex testing Journal Module', () => {
    test('Initial State, must have this state', () => { // Most basic
        const store = createVuexStore(journalState);
        const { isLoading, entries } = store.state.journal;
        expect(isLoading).toBeFalsy();
        expect(entries).toEqual(journalState.entries);
    });
    test('Mutations: setEntries', () => {
        const store = createVuexStore({ isLoading: true, entries: []});
        store.commit('journal/setEntries', journalState.entries);
        expect(store.state.journal.entries.length).toBe(2);
        expect(store.state.journal.isLoading).toBeFalsy();
    });
    test('Mutations: Update entries', () => {
        const store = createVuexStore(journalState);
        const updatedEntry = {
            id: "-N8fu6mGAF6m-D3fiod4",
            date: 1659667771606,
            text: "Testing new Vue App UPDATED"
        };
        const storeEntries = store.state.journal.entries;
        store.commit('journal/updateEntry', updatedEntry);
        expect(storeEntries.length).toBe(2);
        expect(storeEntries.find(entry => entry.id === updatedEntry.id)).toEqual(updatedEntry);
    });
    test('Mutations: Add and delete new entry', () => {
        const store = createVuexStore(journalState);
        const storeEntries = store.state.journal.entries;
        const idNewEntry = "ABC-123";
        const newEntry = { id: idNewEntry, text: "Hello World" };
        store.commit('journal/addEntry', newEntry);
        expect(storeEntries.length).toBe(3);
        expect(storeEntries.find(entry => entry.id === idNewEntry)).toEqual(newEntry);
        expect(storeEntries.find(entry => entry.id === idNewEntry).text).toEqual(newEntry.text);
        store.commit('journal/deleteEntry', idNewEntry);
        expect(storeEntries.length).toBe(2);
        expect(storeEntries.find(entry => entry.id === idNewEntry)).toBeUndefined();
    });
    test('Getters: Get entries', () => {
        const store = createVuexStore(journalState);
        const [entry1, entry2] = journalState.entries;
        expect(store.getters['journal/getEntriesByTerm']('').length).toBe(2);
        expect(store.getters['journal/getEntriesByTerm']('2').length).toBe(1);
        expect(store.getters['journal/getEntriesByTerm']('2')).toEqual([entry2]);
        expect(store.getters['journal/getEntryById'](entry1.id)).toEqual(entry1);
    });
    test('Actions: Load entries', async () => { // This comes from Firebase
        const store = createVuexStore({ isLoading: true, entries: []});
        await store.dispatch('journal/loadEntries');
        const storeEntries = store.state.journal.entries;
        expect(storeEntries.length).toBe(2); // TODO: This amount is going to change in the future, add a better one later
    });
    test('Actions: Add, Get, Update and Delete entry', async () => {
        const store = createVuexStore(journalState);
        const newEntry = {
            date: 1659667771606,
            picture: "https://iconape.com/wp-content/png_logo_vector/jest-logo.png",
            text: "Testing Vuex against Firebase using Jest"
        }
        const newEntryId = await store.dispatch('journal/createEntry', newEntry);
        expect(typeof newEntryId).toBe('string');
        expect(store.state.journal.entries.find(entry => entry.id === newEntryId)).toBeTruthy();
        const newEntryText = 'New Value to test actions in vuex store with Jest';
        newEntry.id = newEntryId;
        newEntry.text = newEntryText;
        await store.dispatch('journal/updateEntry', newEntry);
        expect(store.state.journal.entries.find(entry => entry.id === newEntry.id)).toEqual(newEntry);
        expect(store.state.journal.entries.find(entry => entry.id === newEntry.id).text).toEqual(newEntryText);
        await store.dispatch('journal/deleteEntry', newEntryId);
        expect(store.state.journal.entries.find(entry => entry.id === newEntryId)).toBeFalsy();
    });
});

export const setEntries = (state, entries) => {
    state.entries = [...state.entries, ...entries];
    state.isLoading = false;
}

export const updateEntry = (state, entry) => {
    // console.log('updateEntry:entry:', entry);
    const idx = state.entries.map(e => e.id).indexOf(entry.id);
    state.entries[idx] = entry;
}

export const addEntry = (state, entry) => {
    // console.log('addEntry:entry:', entry);
    state.entries.unshift(entry);
}

export const deleteEntry = (state, id) => {
    // console.log('deleteEntry:id:', id);
    const index = state.entries.findIndex(entry => entry.id === id);
    // console.log('index:', index);
    state.entries.splice(index, 1);
}

export const getEntriesByTerm = (state) => (term = '') => {
    if (!term.length) return state.entries
    return state.entries.filter(entry => entry.text.toLowerCase().includes(term.toLowerCase()));
}

export const getEntryById = (state) => (id = '') => {
    const entry = state.entries.find(entry => entry.id === id);
    if (!entry) return;
    return {...entry};
}

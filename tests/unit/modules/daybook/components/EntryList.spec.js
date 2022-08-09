import { createStore } from "vuex";
import { shallowMount } from "@vue/test-utils";

import EntryList from "@/modules/daybook/components/EntryList.vue";
import journal from '@/modules/daybook/store/journal';
import { journalState } from "../../../mock-data/test-journal-state";


const createVuexStore = (initialState) => createStore({
    modules: {
        journal: {
            ...journal,
            state: { ...initialState }
        }
    }
});

describe('EntryList.vue', () => {
    const store = createVuexStore(journalState);
    const mockRouter = {
        push: jest.fn()
    };
    let wrapper;
    beforeEach(() => {
        jest.clearAllMocks();
        wrapper = shallowMount(EntryList, {
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [store]
            }
        });
    });
    test('It must call getEntriesByTerm and show 2 entries', () => {
        expect(wrapper.findAll('entry-stub').length).toBe(2);
        expect(wrapper.html()).toMatchSnapshot()
    });
    test('It must getEntriesByTerm and filter entries', async () => {
        const input = wrapper.find('input');
        await input.setValue('Vue App 2');
        expect(wrapper.findAll('entry-stub').length).toBe(1);
    });
    test('The button "new" must redirect to /new', () => {
        wrapper.find('button').trigger('click');
        expect(mockRouter.push).toHaveBeenCalledWith({name: 'entry', params: {id: 'new'}});
    });
});

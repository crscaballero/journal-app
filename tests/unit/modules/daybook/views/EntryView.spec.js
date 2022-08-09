import { createStore } from "vuex";
import { shallowMount } from "@vue/test-utils";
import Swal from "sweetalert2";

import EntryView from "@/modules/daybook/views/EntryView.vue";
import journal from '@/modules/daybook/store/journal';
import { journalState } from "../../../mock-data/test-journal-state";


const createVuexStore = ( initialState ) => createStore({
    modules: {
        journal: {
            ...journal,
            state: { ...initialState }
        }
    }
});

jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
    showLoading: jest.fn(),
    close: jest.fn()
}));

describe('EntryView.vue', () => {
    const store = createVuexStore(journalState);
    store.dispatch = jest.fn();
    const mockRouter = {
        push: jest.fn()
    };
    let wrapper;
    beforeEach(() => {
        jest.clearAllMocks()
        wrapper = shallowMount( EntryView, {
            props: {
                id: journalState.entries[0].id
            },
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [ store ]
            }
        })
    })
    test('It must redirect the user because the id doesn\'t exist', () => {
        const wrapper = shallowMount(EntryView, {
            props: {
                id: 'ThisIdDoesNotExistInTheStore'
            },
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [store]
            }
        });
        expect(wrapper.html()).toMatchSnapshot();
        expect(mockRouter.push).toHaveBeenCalledWith({name: 'no-entry'});
    });
    test('Must show the entry correctly', () => {
        expect(wrapper.html()).toMatchSnapshot();
        expect(mockRouter.push).not.toHaveBeenCalled();
    });
    test('It must delete the entry and get out', (done) => {
        Swal.fire.mockReturnValueOnce(Promise.resolve({ isConfirmed: true }));
        wrapper.find('.btn-danger').trigger('click');
        expect(Swal.fire).toHaveBeenCalledWith({
            title: 'Are you sure?',
            text: 'Once deleted can not be retrieved',
            showDenyButton: true,
            confirmButtonText: 'Yes, I am sure'
        });
        setTimeout(() => {
            expect(store.dispatch).toHaveBeenCalledWith('journal/deleteEntry', journalState.entries[0].id);
            expect(mockRouter.push).toHaveBeenCalled();
            done();
        }, 1);
    });
});

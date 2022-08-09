import { shallowMount } from "@vue/test-utils";

import Entry from "@/modules/daybook/components/Entry.vue";
import { journalState } from '../../../mock-data/test-journal-state';

describe('Entry.vue', () => {
    const mockRouter = {
        push: jest.fn()
    };
    const wrapper = shallowMount(Entry, {
        props: {
            entry: journalState.entries[0]
        },
        global: {
            mocks: {
                $router: mockRouter
            }
        }
    });
    test('It must render the component correctly', () => {
        expect(wrapper.html()).toMatchSnapshot();
    });
    test('It must redirect with click on entry-container', () => {
        const entryContainer = wrapper.find('.entry-container');
        entryContainer.trigger('click');
        expect(mockRouter.push).toHaveBeenCalled();
        expect(mockRouter.push).toHaveBeenCalledWith({
            name: 'entry',
            params: {
                id: journalState.entries[0].id
            }
        });
    });
    test('Test computed properties', () => {
        expect(wrapper.vm.day).toBe(4);
        expect(wrapper.vm.month).toBe('August');
        expect(wrapper.vm.yearDay).toBe('2022, Thursday');
    });
});

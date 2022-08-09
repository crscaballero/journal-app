import { shallowMount } from '@vue/test-utils';

import Fab from '@/modules/daybook/components/Fab.vue';

describe('Fab.vue', () => {
    test('It must render the component correctly', () => {
        const wrapper = shallowMount(Fab);
        expect(wrapper.html()).toMatchSnapshot();
    });
    test('It must show the icon for default: fa-plus', () => {
        const wrapper = shallowMount(Fab);
        const iTag = wrapper.find('i');
        expect(iTag.classes('fa-plus')).toBeTruthy()
    });
    test('It must show the icon given a prop: fa-circle', () => {
        const wrapper = shallowMount(Fab, {
            props: {
                icon: 'fa-circle'
            }
        });
        const iTag = wrapper.find('i');
        expect(iTag.classes('fa-circle')).toBeTruthy()
    });
    test('It must emit the event on:click after a click', () => {
        const wrapper = shallowMount(Fab);
        wrapper.find('button').trigger('click');
        expect(wrapper.emitted('on:click')).toHaveLength(1);
    });
});

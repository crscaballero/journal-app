import { shallowMount } from '@vue/test-utils';

import Navbar from '@/modules/daybook/components/Navbar.vue';

describe('Navbar.vue', () => {
    test('It must render the component correctly', () => {
        const wrapper = shallowMount(Navbar);
        expect(wrapper.html()).toMatchSnapshot();
    });
});

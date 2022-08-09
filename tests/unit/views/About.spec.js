import { shallowMount } from '@vue/test-utils';

import AboutView from '@/views/AboutView.vue';

describe('AboutView.vue', () => {
	test('It must render the view correctly', () => {
		const wrapper = shallowMount(AboutView);
		expect(wrapper.html()).toMatchSnapshot();
	});
});

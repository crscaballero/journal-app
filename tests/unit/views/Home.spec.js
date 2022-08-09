import { shallowMount } from '@vue/test-utils';

import HomeView from '@/views/HomeView.vue';

describe('HomeView.vue', () => {
	test('It must render the view correctly', () => {
		const wrapper = shallowMount(HomeView);
		expect(wrapper.html()).toMatchSnapshot();
	});
	test('Click in a button must redirect to "no-entry"', () => {
		const mockRouter = {
			push: jest.fn()
		}
		const wrapper = shallowMount(HomeView, {
			global: {
				mocks: {
					$router: mockRouter
				}
			}
		});
		wrapper.find('button').trigger('click');
		expect(mockRouter.push).toHaveBeenCalledWith({ name: 'no-entry' });
	});
});

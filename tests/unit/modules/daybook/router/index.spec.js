import daybookRouter from '@/modules/daybook/router';

describe('Test on router\'s Daybook module', () => {
    test('Router must have this config', async () => {
        expect(daybookRouter).toMatchObject({
            name: 'daybook',
            component: expect.any(Function),
            children: [
                {
                    path: '',
                    name: 'no-entry',
                    component: expect.any(Function)
                },
                {
                    path: ':id',
                    name: 'entry',
                    component: expect.any(Function),
                    props: expect.any(Function)
                }
            ]
        });
        // expect((await daybookRouter.children[0].component()).default.name).toBe('NoEntrySelected');
        // expect((await daybookRouter.children[1].component()).default.name).toBe('EntryView');
        const promiseRoutes = [];
        daybookRouter.children.forEach(child => promiseRoutes.push(child.component()));
        const routes = (await Promise.all(promiseRoutes)).map(route => route.default.name); // This must be evaluated with a promise because those components are imported asynchronous
        expect(routes).toContain('EntryView');
        expect(routes).toContain('NoEntrySelected');
    });
    test('Must return the id\'s route', () => {
        const route = {
            params: {
                id: 'ABC-123'
            }
        };
        // expect(daybookRouter.children[1].props(route)).toMatchObject({id: 'ABC-123'});
        const entryRoute = daybookRouter.children.find(route => route.name === 'entry');
        expect(entryRoute.props(route)).toMatchObject({id: 'ABC-123'});
    });
});

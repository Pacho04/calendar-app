const { types } = require("../../types/types")

describe('Pruebas en los types', () => {

    test('los types debe de ser iguales', async () => {
        expect(types).toEqual({
            uiOpenModal: '[ui] Open modal',
            uiCloseModal: '[ui] Close modal',

            eventSetActive: '[event] Set Active',
            eventLogout: '[event] Logout event',

            eventStartAddNew: '[event] Start add new',
            eventAddNew: '[event] Add New',
            eventClearActiveEvent: '[event] Clear active event',
            eventUpdate: '[event] Event update',
            eventDeleted: '[event] Event Deleted',
            eventLoaded: '[event] Events loaded',

            authCheckingFinish: '[auth] Finish checking login state',
            authStartLogin: '[auth] Start Login',
            authLogin: '[auth] Login',
            authStartRegister: '[auth] Start Register',
            authStartTokenRenew: '[auth] Start token renew',
            authLogout: '[auth] Logout'
        });
    })

})

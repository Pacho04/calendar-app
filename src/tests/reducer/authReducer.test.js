const { authReducer } = require("../../reducer/authReducer");
const { types } = require("../../types/types");

const initState = {
    checking: true
}

describe('Pruebas en el authReducer', () => {
    
    test('debe de retornar el estado por defecto', () => {
        const action = {};
        const state = authReducer(initState, action);

        expect(state).toEqual(initState);
    })
    
    test('debe de autenticar el usuario', () => {
        
        const action = {
            type: types.authLogin,
            payload: {
                uid: '1234',
                name: 'David'
            }
        };

        const state = authReducer(initState, action);

        expect(state).toEqual({checking:false, uid:'1234',name:'David'}); 
    })
    
})

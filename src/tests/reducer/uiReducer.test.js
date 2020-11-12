const { uiOpenModal, uiCloseModal } = require("../../actions/ui");
const { uiReducer } = require("../../reducer/uiReducer");

const initialState = {
    modalOpen: false
};

describe('Pruebas en el uiReducer', () => {
    

    test('debe de retornar el estado por defecto', () => {
        
        const state = uiReducer(initialState, {});

        expect(state).toEqual(initialState);
    });

    test('debe de abrir y cerrar el modal', () => {
        
        const modalOpen = uiOpenModal();
        const state = uiReducer(initialState, modalOpen);

        expect(state).toEqual({modalOpen: true});

        const modalClose = uiCloseModal();
        const stateClose = uiReducer(state, modalClose);

        expect(stateClose).toEqual({modalOpen: false});


    })
    
    

})

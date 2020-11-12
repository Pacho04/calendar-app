import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';

import '@testing-library/jest-dom';

import { startCheking, startLogin, startRegister } from '../../actions/auth';
import { types } from '../../types/types';
import * as fetchModule from '../../helpers/fetch';


jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {};
let store = mockStore(initialState);

Storage.prototype.setItem = jest.fn();

describe('Pruebas en las acciones de Auth', () => {

    beforeEach(() => {
        store = mockStore(initialState);
        jest.clearAllMocks();
    });

    test('startLogin sea correcto', async () => {

        await store.dispatch(startLogin('david@gmail.com', '123456'));

        const actions = store.getActions();


        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: expect.any(String),
                name: expect.any(String)
            }
        });

        expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String));
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));

    });

    test('starLogin sea incorrecto', async() => {
        await store.dispatch(startLogin('david@gmail.com', '123456789'));

        const actions = store.getActions();

        expect(actions).toEqual([]);
        expect(Swal.fire).toHaveBeenCalledWith("Error", "La password no es correcta", "error");
    });

    test('startRegister correcto ', async() => {

        fetchModule.fetchSinToken = jest.fn(() => ({
            json(){
                return {
                    ok: true,
                    uid: '1234',
                    name: 'El PEPE',
                    token: 'desvbewyhudv'
                }
            }
        }));


        await store.dispatch(startRegister('test@test.com', '123456', 'test'));

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: expect.any(String),
                name: expect.any(String)
            }
        });

        expect(localStorage.setItem).toHaveBeenCalledWith('token', 'desvbewyhudv');
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));

    });

    test('startCheking correcto', async() => {

        fetchModule.fetchConToken = jest.fn(() => ({
            json(){
                return {
                    ok: true,
                    uid: '1234',
                    name: 'El PEPE',
                    token: 'desvbewyhudv'
                }
            }
        }));

        await store.dispatch(startCheking());

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: expect.any(String),
                name: expect.any(String)
            }
        });

        expect(localStorage.setItem).toHaveBeenCalledWith('token', 'desvbewyhudv');

    });
    
    
    
})

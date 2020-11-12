import { fetchSinToken } from "../../helpers/fetch";



describe('Pruebas en el fetch', () => {
    
    test('fetchSinToken debe de funcionar correctamente', async() => {
        
        const resp = await fetchSinToken('auth', {email: 'david@gmail.com', password: '123456'}, 'POST');

        expect(resp instanceof Response).toBe(true);

        const body = await resp.json();
        
        expect(body.ok).toBe(true);

    })
    
})

import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";

export const eventStartAddNew = (event) => {
    return async(dispatch, getState) => {
        
        const {uid, name} = getState();

        try {
            
            const resp = await fetchConToken('event', event, 'POST');
            const body = await resp.json();

            if(body.ok){
                event.id = body.evento.id;
                event.user = {
                    _id: uid,
                    name: name
                }

                dispatch(eventAddNew(event));
            }

        } catch (error) {
            console.log(error)
        }
    }
}

const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});

export const eventClearActiveEvent = () => ({
    type: types.eventClearActiveEvent
});

export const eventStartUpdate = (event) => {
    return async(dispatch) => {
        try {

            const resp = await fetchConToken(`event/${event.id}`, event, 'PUT');
            const body = await resp.json()
            
            if(body.ok){
                dispatch(eventUpdate(event));
            } else{
                Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            console.log(error)
        }
    }
}


const eventUpdate = (event) => ({
    type: types.eventUpdate,
    payload: event,
});

export const eventStartDelete = () => {
    return async(dispatch, getState) => {

        const {id} = getState().calendar.activeEvent;

        try {

            const resp = await fetchConToken(`event/${id}`, {}, 'DELETE');
            const body = await resp.json()
            
            if(body.ok){
                dispatch(eventDeleted());
            } else{
                Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            console.log(error)
        }
    }
}


const eventDeleted = () => ({
    type: types.eventDeleted
});

export const eventStartLoading = () => {
    return async(dispatch) => {
        try {
            
            const resp = await fetchConToken('event');
            const body = await resp.json();

            const events = prepareEvents(body.eventos);

            dispatch(eventLoaded(events));

        } catch (error) {
            console.log(error)
        }
    }
}

const eventLoaded = (event) => ({
    type: types.eventLoaded,
    payload: event
});

export const eventLogout = () =>({
    type: types.eventLogout
});
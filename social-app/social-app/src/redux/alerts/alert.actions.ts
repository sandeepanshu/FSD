import {v4} from 'uuid';

export const SET_ALERT:string = 'SET_ALERT';
export const REMOVE_ALERT:string = 'REMOVE_ALERT';

export const setAlert = (message:string , color : string) => {
    let id:string = v4();
    return (dispatch:any) => {
        try {
            dispatch({
                type : SET_ALERT,
                payload : {
                    id : id,
                    message : message,
                    color : color
                }
            });
            setTimeout(() => {
                dispatch(removeAlert(id));
            }, 3000);
        }
        catch (error) {
            console.error(error);
        }
    }
};

export const removeAlert = (id:string) => {
    return (dispatch:any) => {
        try {
            dispatch(
                {
                    type : REMOVE_ALERT,
                    payload : {
                        id : id
                    }
                }
            );
        }
        catch (error) {
            console.error(error);
        }
    }
};
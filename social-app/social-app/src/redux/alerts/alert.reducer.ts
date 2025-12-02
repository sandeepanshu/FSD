import * as alertActions from './alert.actions';

export interface IAlert {
    id : string,
    message : string;
    color : string;
}

export interface AlertState {
    alerts : IAlert[]
}
let initialState:AlertState = {
    alerts : [] as IAlert[]
};

export const reducer = (state = initialState , action:any):AlertState => {
    switch(action.type) {
        case alertActions.SET_ALERT:
            return {
              alerts : [...state.alerts , action.payload]
            };
        case alertActions.REMOVE_ALERT:
            let updatedAlerts:IAlert[] = state.alerts.filter(alert => alert.id !== action.payload.id);
            return {
                alerts : [...updatedAlerts]
            };
        default : return state;
    }
};













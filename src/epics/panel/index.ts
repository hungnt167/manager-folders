import {Action} from "redux";
import {ofType} from "redux-observable";
import {Observable} from "rxjs";
import {mapTo} from "rxjs/operators";
import {LOGIN_ACTION_SUCCESS} from "types/panel";

const panelEpic = (action$: Observable<Action<any>>): Observable<Action<any>> =>
    action$.pipe(
        ofType(LOGIN_ACTION_SUCCESS),
        mapTo({ type: 'PONG' })
    );

export default panelEpic;
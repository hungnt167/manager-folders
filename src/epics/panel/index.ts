import {Action} from "redux";
import {ofType} from "redux-observable";
import {Observable} from "rxjs";
import {mapTo} from "rxjs/operators";

const panelEpic = (action$: Observable<Action<any>>): Observable<Action<any>> =>
    action$.pipe(
        ofType("TEST"),
        mapTo({ type: 'PONG' })
    );

export default panelEpic;
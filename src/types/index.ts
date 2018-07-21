import {IAsideState} from "types/aside";
import {IMainState} from "types/main";
import {ITreeState} from "types/tree";


export interface IApplicationState {
    AsideReducer: IAsideState,
    MainReducer: IMainState,
    TreeReducer: ITreeState,
}
import {IAsideState} from "types/aside";
import {ITreeState} from "types/tree";


export interface IApplicationState {
    AsideReducer: IAsideState,
    TreeReducer: ITreeState,
}
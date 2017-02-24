import {combineReducers} from 'redux';
import {routerStateReducer} from 'redux-router';

/*
export default combineReducers({
    session:session,
    router: routerStateReducer
});*/
export { default as Session } from './SessionReducer';
export { default as Message } from './MessageReducer';
export { default as Calendar } from './CalendarReducer';
export { default as Group } from './GroupReducer';
//export { default as Menubar } from './MenubarReducer';
//export {default as Localise} from './LocaliseReducer';

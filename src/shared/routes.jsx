import React     from 'react';
import { Router,browserHistory,Route,IndexRoute, } from 'react-router';
import App from './template/index'
import {requireContainer} from './template/AppContainer';
import {requireAuthentication} from './template/AuthenticatedComponent';
import Home from './components/home/home';
import Calendar from './components/calendar/calendar';
import Login from './components/session/login';
import Myaccount from './components/myaccount/myaccount';
import Chat from './components/chat/chat';
import Team from './components/team/team';
import error404 from './template/error/error404';
import {ROUTING} from './constants/DefaultConstants';

//Comment faire pour rajouter une route:
// 1) Rajouter la route ici
// 2) Rajouter la route correspondante dans DefaultConstants, variable ROUTING

//Pour rajouter une langue:
// 1) Créer toutes les URLS associées dans DefaultConstants.
// 2) Placer ensuite ici les routes correspondantes.

export default (
    <Route name="app" component={(App)} path="/">
        <IndexRoute phrase="ES6" component={requireAuthentication(requireContainer(Myaccount))}/>

        <Route path="/" locale="fr" component={requireAuthentication(requireContainer(Myaccount))}/>
        <Route path="/calendar" locale="fr" component={requireAuthentication(requireContainer(Calendar))}/>
        <Route path="/myaccount" locale="fr" component={requireAuthentication(requireContainer(Myaccount))}/>
        <Route path="/chat" locale="fr" component={requireAuthentication(requireContainer(Chat))}/>
        <Route path="/team" locale="fr" component={requireAuthentication(requireContainer(Team))}/>
        <Route path="/login" locale="fr" component={(Login)}/>
        <Route path="*" locale="fr" component={requireContainer(error404)}/>

    </Route>
);

/*
 Le composant LocText permet de créer des zones de textes éditables, liens, div, etc...
 Il réagit en fonction de la langue.

 Quelques exemples:
 <LocText tagtype="div" page="home" textzone="une_id_unique" />                       //Si le tagtype n'est pas précisé, le type est div.

 <LocText tagtype="link" to="Expert" page="menubar" textzone="une_id_unique" />       //Crée le lien vers Expert (en fonction de la langue).
 A noter que dans ce dernier exemple, on utilise une "page" qui est présente PARTOUT (menubar) donc qui doit être chargée tout le temps.
 Il faut penser à rajouter dans le composant Localise son chargement par défaut.



 */
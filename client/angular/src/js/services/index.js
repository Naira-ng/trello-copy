import angular from 'angular';

// Create the module where our functionality can attach to
let servicesModule = angular.module('app.services', []);


import UserService from './user.service';
servicesModule.service('User', UserService);

import JwtService from './jwt.service'
servicesModule.service('JWT', JwtService);

import CommentsService from './comments.service';
servicesModule.service('Comments', CommentsService);


import BoardService from './board.service';
servicesModule.service('Board', BoardService);

import TaskService from './task.service';
servicesModule.service('TaskService', TaskService);


export default servicesModule;

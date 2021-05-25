export default class TaskService {
    constructor(AppConstants, $http, JWT) {
        'ngInject';

        this._AppConstants = AppConstants;
        this._$http = $http;
        this._JWT = JWT;
    }


    // Add a comment to an article
    add(task) {
        return this._$http({
            url: `${this._AppConstants.api}/task`,
            method: 'POST',
            headers: {
                Authorization: this._JWT.get()
            },
            data: task
        }).then((res) => res.data);

    }

    getAll(boardId) {
        return this._$http({
            url: `${this._AppConstants.api}/task/`,
            method: 'GET',
            headers: {
                Authorization: this._JWT.get()
            },
            params: {
                boardId: boardId
            }

        }).then((res) => res.data.tasks);

    }

    update(task) {
        return this._$http({
            url: `${this._AppConstants.api}/task/${task._id}`,
            method: 'PUT',
            headers: {
                Authorization: this._JWT.get()
            },
            data: {
                task: task
            }

        }).then((res) => res.data.task);

    }

    destroy(taskId) {
        return this._$http({
            url: `${this._AppConstants.api}/task/${taskId}`,
            headers: {
                Authorization: this._JWT.get()
            },
            method: 'DELETE',
        });
    }

}

export default class Board {
    constructor(AppConstants, $http, JWT) {
        'ngInject';

        this._AppConstants = AppConstants;
        this._$http = $http;
        this._JWT = JWT;
    }


    // Add a comment to an article
    add(board) {
        return this._$http({
            url: this._AppConstants.api + '/board/',
            method: 'POST',
            headers: {
                Authorization: this._JWT.get()
            },
            data: board
        }).then((res) => res.data);

    }

    getAll() {
        return this._$http({
            url: `${this._AppConstants.api}/board`,
            method: 'GET',
            headers: {
                Authorization: this._JWT.get()
            },
        }).then((res) => res.data.boards);

    }

    update(assigned_users, boardId) {
        return this._$http({
            url: `${this._AppConstants.api}/board/${boardId}`,
            method: 'PATCH',
            headers: {
                Authorization: this._JWT.get()
            },
            data: { assigned_users: assigned_users }
        }).then((res) => res.data.board);

    }

    destroy(commentId, articleSlug) {
        return this._$http({
            url: `${this._AppConstants.api}/articles/${articleSlug}/comments/${commentId}`,
            method: 'DELETE',
        });
    }

}

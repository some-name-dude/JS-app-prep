var data = function() {
    const LOCAL_STORAGE_AUTH_KEY = "";

    /* Users */
    function login(user) {
        var promise = new Promise(function(resolve, reject) {
            var url = "api/auth";

            $.ajax(url, {
                type: "PUT",
                contentType: "application/json",
                data: JSON.stringify(user),
                success: function(res) {
                    localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, res.result.authKey);
                    resolve(res);
                }
            });
        });
        return promise;
    }

    function register(user) {
        var promise = new Promise(function(resolve, reject) {
            var url = "api/users";

            $.ajax(url, {
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(user),
                success: function(res) {
                    resolve(res);
                }
            });
        });
        return promise;
    }

    return {
        users: {
            login: login,
            register: register
        }
    };
}();
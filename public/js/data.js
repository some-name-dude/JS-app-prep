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

    function isLoggedIn() {
        return !!localStorage.getItem("username");
    }

    function getCurrentUser() {
        return localStorage.getItem("username");
    }

    function logout() {
        return Promise.resolve()
            .then(() => {
                localStorage.removeItem("username");
                localStorage.removeItem("authKey");

                $("#btn-nav-login").removeClass("hidden");
                $("#btn-nav-register").removeClass("hidden");
                $("#user-logout").parent("li").addClass("hidden");
                $("#username-value").parent("li").addClass("hidden");
            });
    }

    return {
        users: {
            login: login,
            register: register,
            logout: logout,
            isLoggedIn: isLoggedIn,
            getCurrentUser: getCurrentUser
        }
    };
}();
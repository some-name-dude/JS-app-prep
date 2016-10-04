var data = function() {
    const LOCAL_STORAGE_AUTH_KEY = "";

    /* Users */
    function login(user) {
        // var promise = new Promise(function(resolve, reject) {
        //     var url = "api/auth";

        //     $.ajax(url, {
        //         type: "PUT",
        //         contentType: "application/json",
        //         data: JSON.stringify(user),
        //         success: function(res) {
        //             localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, res.result.authKey);
        //             resolve(res);
        //         }
        //     });
        // });
        // return promise;

        return requester.putJSON("/api/auth", user)
            .then(respUser => {
                localStorage.setItem("username", respUser.result.username);
                localStorage.setItem("authKey", respUser.result.authKey);
            });
    }

    function register(user) {
        // var promise = new Promise(function(resolve, reject) {
        //     var url = "api/users";

        //     $.ajax(url, {
        //         type: "POST",
        //         contentType: "application/json",
        //         data: JSON.stringify(user),
        //         success: function(res) {
        //             resolve(res);
        //         }
        //     });
        // });
        // return promise;

        return requester.postJSON("/api/users", user);
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

    /* Cookies */

    function getCookies() {
        return requester.getJSON("/api/cookies");
    }

    // function getCookies() {
    //     var promise = new Promise(function(resolve, reject) {
    //         var url = "api/cookies";
    //         $.getJSON(url)
    //             .done(resolve)
    //             .fail(reject);
    //     });
    //     return promise;
    // }

    return {
        users: {
            login: login,
            register: register,
            logout: logout,
            isLoggedIn: isLoggedIn,
            getCurrentUser: getCurrentUser
        },
        cookies: {
            get: getCookies
        }
    };
}();
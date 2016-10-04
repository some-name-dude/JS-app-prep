var usersController = (function() {

    function login(context) {
        templates.get("login")
            .then(function(template) {
                context.$element().html(template());

                $("#btn-login").on("click", function() {
                    var $userName = $("#tb-username").val();
                    var $passWord = $("#tb-password").val();
                    var passHash = CryptoJS.SHA1($passWord).toString();
                    // console.log(passHash);

                    var user = {
                        username: $userName,
                        passHash: passHash
                    };

                    data.users.login(user)
                        .then(function(respUser) {

                            // it's not needed when using requester!
                            // console.log(respUser);
                            // localStorage.setItem("username", respUser.result.username);
                            // localStorage.setItem("authKey", respUser.result.authKey);
                            // console.log(localStorage.getItem("authKey"));
                            // console.log(localStorage.getItem("username"));

                            console.log("user logged in");
                            toastr.success(`User "${user.username}" logged in!`);

                            $("#username-value").parent("li").removeClass("hidden");
                            $("#username-value").html("Hello, " + user.username);
                            $("#btn-nav-login").addClass("hidden");
                            $("#btn-nav-register").addClass("hidden");
                            $("#user-logout").parent('li').removeClass("hidden");

                            context.redirect("#/");
                        });
                });

                // If you need both butttons register and login
                // $("#btn-register").on("click", function() {
                //     var $userName = $("#tb-username").val();
                //     var $passWord = $("#tb-password").val();
                //     var user = {
                //         username: $userName,
                //         password: $passWord
                //     };

                //     data.users.register(user)
                //         .then(function() {
                //             console.log("user registered");
                //             toastr.success(`User "${user.username}" successfully registered!`);
                //         });
                // });
            });
    }

    function register(context) {
        templates.get("register")
            .then(function(template) {
                context.$element().html(template());

                $("#btn-register").on("click", function() {
                    var $userName = $("#tb-username").val();
                    var $passWord = $("#tb-password").val();

                    var passHash = CryptoJS.SHA1($passWord).toString();
                    // console.log(passHash);

                    var user = {
                        username: $userName,
                        passHash: passHash
                    };

                    data.users.register(user)
                        .then(function(respUser) {

                            data.users.login(user)
                                .then(function(logedUser) {
                                    
                                    // it's not needed when using requester!
                                    // console.log(logedUser);
                                    // localStorage.setItem("username", logedUser.result.username);
                                    // localStorage.setItem("authKey", logedUser.result.authKey);
                                    // console.log(localStorage.getItem("authKey"));
                                    // console.log(localStorage.getItem("username"));

                                    console.log("user registered");
                                    toastr.success(`User "${respUser.result.username}" successfully registered!`);

                                    $("#username-value").parent("li").removeClass("hidden");
                                    $("#username-value").html(`Hello, ${respUser.result.username}`);
                                    $("#btn-nav-login").addClass("hidden");
                                    $("#btn-nav-register").addClass("hidden");
                                    $("#user-logout").parent('li').removeClass("hidden");

                                    context.redirect("#/");
                                });
                        });
                });

                // If you need both butttons register and login
                // $("#btn-login").on("click", function() {
                //     var $userName = $("#tb-username").val();
                //     var $passWord = $("#tb-password").val();
                //     var user = {
                //         username: $userName,
                //         password: $passWord
                //     };

                //     data.users.login(user)
                //         .then(function() {
                //             toastr.success(`User "${user.username}" logged in!`);
                //             context.redirect("#/");
                //         });
                // });
            });
    }

    return {
        login: login,
        register: register
    };
}());
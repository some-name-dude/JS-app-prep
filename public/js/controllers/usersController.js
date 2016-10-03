/* globals $, CryptoJS */

var usersController = (function() {

    function login(context) {
        templates.get("login")
            .then(function(template) {
                context.$element().html(template());

                $("#btn-login").on("click", function() {
                    var $userName = $("#tb-username").val();
                    var $passWord = $("#tb-password").val();
                    var passHash = CryptoJS.SHA1($passWord).toString();
                    console.log(passHash);

                    var user = {
                        username: $userName,
                        passHash: passHash
                    };

                    data.users.login(user)
                        .then(function() {
                            console.log("user logged in");
                            toastr.success(`User "${user.username}" logged in!`);
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
                    console.log(passHash);

                    var user = {
                        username: $userName,
                        passHash: passHash
                    };

                    data.users.register(user)
                        .then(function() {
                            console.log("user registered");
                            toastr.success(`User "${user.username}" successfully registered!`);
                            context.redirect("#/");
                        })
                        .then(data.users.login(user));
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
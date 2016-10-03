(function() {
    var sammyApp = Sammy("#content", function() {

        this.get("#/", function() {
            this.redirect("#/home");
        });

        this.get("#/home", homeController.all);

        this.get("#/register", usersController.register);

        this.get("#/login", usersController.login);


    });

    $(function() {
        sammyApp.run("#/");
    });


    let isUserLogged = data.users.isLoggedIn();
    // console.log(isUserLogged);
    if (isUserLogged) {
        let username = data.users.getCurrentUser();
        // console.log(username);

        $("#username-value").parent("li").removeClass("hidden");
        $("#username-value").html("Hello, " + username);
        $("#btn-nav-login").addClass("hidden");
        $("#btn-nav-register").addClass("hidden");
        $("#user-logout").parent('li').removeClass("hidden");
    }

    $("#user-logout").on("click", function() {
        data.users.logout();
    });

}());
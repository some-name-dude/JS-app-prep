var homeController = function() {

    function all(context) {
        var cookies;
        data.cookies.get()
            .then(function(resCookies) {
                cookies = resCookies.result;
                return templates.get("home");
            })
            .then(function(template) {
                context.$element().html(template(cookies));
            });
    }

    return {
        all: all
    };
}();
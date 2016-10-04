// let templates = {
//     get: function(name) {
//         let url = `/templates/${name}.handlebars`;
//         console.log(url);
//         return requester.get(url);
//     }
// };

var handlebars = window.handlebars || window.Handlebars;
let templates = {
    get: function(name) {
        let promise = new Promise(function(resolve, reject) {
            let url = `templates/${name}.handlebars`;
            $.get(url, function(html) {
                var template = handlebars.compile(html);
                resolve(template);
            });
        });
        return promise;
    }
};

// The old way with IIFE

// var templates = (function() {
//     var handlebars = window.handlebars || window.Handlebars;

//     function get(name) {
//         var promise = new Promise(function(resolve, reject) {
//             var url = `templates/${name}.handlebars`;
//             $.get(url, function(html) {
//                 var template = handlebars.compile(html);
//                 resolve(template);
//             });
//         });
//         return promise;
//     }

//     return {
//         get: get
//     };
// }());
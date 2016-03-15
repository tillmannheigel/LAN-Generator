Router.configure({
    layoutTemplate: 'main'
});

Router.route('/', {
    name: 'generator',
    template: 'generator'
});

Router.route("/drinks");
Router.route("/player");
Router.route("/games");

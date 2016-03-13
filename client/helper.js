Template.registerHelper('currentRouteIs', function (route) {
    return Router.current().route.getName() === route;
});

Template.registerHelper('currentRouteIs', function (route) {
    return Router.current().route.getName() === route;
});
Template.registerHelper('gameById', function (id) {
    return Games.findOne(id).game;
});
Template.registerHelper('playerById', function (id) {
    return Players.findOne(id).name;
});
Template.registerHelper('drinkById', function (id) {
    return Drinks.findOne(id).drink;
});
Template.registerHelper('formatTime', function(date) {
    return moment(date).format("LLL");
});

Helpers = {
    countYo: function() {
        var currentMatch = CurrentMatch.findOne({},{sort: {createdAt: -1}});
        if (currentMatch)
            return Votes.find({matchId: currentMatch._id, vote: "yo"}).count();
        else
            return 0;
    },
    countNo: function(){
        var currentMatch = CurrentMatch.findOne({},{sort: {createdAt: -1}});
        if (currentMatch)
            return Votes.find({matchId: currentMatch._id, vote: "no"}).count();
        else
            return 0;
    },
    getCurrentMatch: function(){
        var currentMatch = CurrentMatch.findOne({},{sort: {createdAt: -1}});
        return currentMatch;
    }
};

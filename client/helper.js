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
    if (date){
        var now = moment();
        var momentDate = moment(date);
        if (now.diff(momentDate, 'days')<1){
            return moment(date).fromNow();
        }else {
            return moment(date).fromNow() + " um " + moment(date).format("LT");
        }
    }
    else return "";
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
        var currentMatch = CurrentMatch.findOne({next: true});
        return currentMatch;
    },
    getSelectedMatch: function(){
        var selectedMatch = CurrentMatch.findOne({selected: true});
        return selectedMatch;
    }
};

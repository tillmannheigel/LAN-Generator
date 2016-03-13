
Template.player.helpers({
    players: function () {
        return Players.find({}, {sort: {name: -1}});
    }

});

Template.player.events({
    "click #foo": function(event, template){

    }
});

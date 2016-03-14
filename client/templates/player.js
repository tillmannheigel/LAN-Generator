
Template.player.helpers({
    players: function () {
        return Players.find({}, {sort: {name: 1}});
    }

});

Template.player.events({
    "click #delete.btn": function(event, template){
        console.log("clicked delete", this._id);
        var r = confirm("Wirklich '" + this.name + "' löschen?");
        if (r == true) {
            Players.remove(this._id);
        }
    }
});

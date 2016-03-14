
Template.games.helpers({
    games : function(){
        return Games.find({}, {sort: {game: 1}});
    }
});

Template.games.events({
    "click #delete.btn": function(event, template){
        console.log("clicked delete", this._id);
        var r = confirm("Wirklich '" + this.game + "' löschen?");
        if (r == true) {
            Games.remove(this._id);
        }
    }
});

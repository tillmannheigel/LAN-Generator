
Template.drinks.helpers({
    drinks: function () {
        return Drinks.find({}, {sort: {drink: -1}});
    }
});

Template.drinks.events({
    "click #delete.btn": function(event, template){
        console.log("clicked delete", this._id);
        var r = confirm("Wirklich '" + this.drink + "' löschen?");
        if (r == true) {
            Drinks.remove(this._id);
        }
    }
});
